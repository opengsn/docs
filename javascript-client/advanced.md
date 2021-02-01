# Advanced configuration

GSN aims to be a generic solution to all meta-transaction needs, and provides a lot of flexibility and composability in its configuration.

* Signing transactions with an [ephemeral key](#using-an-offline-signing-key)
* Injecting [Approval Data](#injecting-approval-data)
* Changing the GSN behaviour with [configuration](#gsnconfig)

## RelayProvider Configuration Parameters

- **paymasterAddress** - The most important (and only mandatory) configuration parameter. The paymaster contract is the one who actually pays for the request.
  It also the one that select which network (RelayHub contract) to use.
- **preferredRelays** - list of relays to use first. Without this parameter, the client would 
  select a relayer from the available registered relays on the RelayHub    
    Note that "preferred relayers" are tried in their explicit order, regardless of their transaction fee (relayers fetched from the RelayHub are sorted with cheaper relayers first)
- **relayLookupWindowBlocks** - when lookup up for relayers, how many blocks back is considered "active" relayer.
  By default, a relayer that sent any transaction in the past 60000 blocks (roughly 1 week on ethereum mainnet) is considered "active"
- **sliceSize** - after selcting relayers and sorting them, how many relayers to ping in parallel.
- **loggerConfiguration** - set of configuration for logging server:
    - **logLevel** - what level to log : `debug`/`info`/`warn`/`error`. defaults to `info`
    - **loggerUrl** - URL of log server. default to none (don't send logs to centralized server)
        for troubleshooting, set to `logger.opengsn.org`, and also give your loggerClient to GSN support.
    - **loggerUserId** - name current client in each log. by default, a unique "gsnUser###" is assigned
- **gasPriceFactorPercent** - by default, the client will query the `getGasPrice()` from the provider, and add
  this value. defaults to "10", which means request gas price is 10% above the `getGasPrice()` value
- **minGasPrice** - with above calculation, don't use gas price below this value.


## Advanced Configuration Parameters

In most cases, you don't need to modify the defaults for these values.

- **relayLookupWindowParts** - when scanning `relayLookupWindowBlocks` blocks back, this parameter is used to chunk down
  into smaller request, to avoid overwhelming the getPastLogs API. Even without specifying this parameter, if the lookup
  seems to break because of too many returned events, it will automatically increase the value for future calls.

- **methodSuffix** - when suffix of the "eth_signTypedData" to use. for Metamask, the default is "_v4"
- **jsonStringifyRequest** - when calling eth_signTypedData, should we pass a the object value as a single string or as a JSON object.
    for Metamask, this value is "true" (use a single string)
- **relayTimeoutGrace** - much much time (in seconds) a relayer that failed a request should be "downscored". (defaults to 1800 seconds=half an hour)

- **auditorsCount** After relaying a request, the client selects at random other relayer(s) as "auditors"
    to validate the original relayer didn't attempt to cheat on the client. defaults to 1 (if there are more than 1 registered relayers)
   
  The auditors check the request, and will submit a "penalize" request if the original relayer indeed attempted a cheat.

  Set to "0" to disable auditing (e.g. on testnets, to avoid the "All auditors failed" error log)

- **maxRelayNonceGap** - how far "into the future" the client accepts its request to be set. default to 3, 
  which means the client accepts that the relayer will put its request with 3 pending requests before it.
  Set to "0" if you only "immediate" transaction.
  
  **Note** that this value can't be enforced by the framework, but the relayer will probably lose if it doesn't honor it:
  If the client specifies "0", and the relayer put the transaction after (say 3) 
  requests, the client will simply re-send the request through another relayer (and downgrading this one for future requests)
  The request will eventually get mined by the other relayer first - and rejected for this relayer (And after signing, the relayer can't simply sign another transaction with the same nonce, since it will get penalized)


## Using an Ephemeral Signing Key <a id="using-an-offline-signing-key"></a>

Usually in web-dapps, the provider holds the account and user's private key.
With GSN, you can create an "ephemeral" account and manage the private key in the browser.
The underlying `web3.currentProvider` is still used to show the user with a "sign" dialog to confirm sending the transaction.

In order to support it, the GSN provider also provides the following `accountManager` API:

```javascript
const { RelayProvider } = require('@opengsn/gsn');
const provider = RelayProvider.newProvider({ provider: web3.currentProvider, config })

const fromAddress = provider.newAccount().address
```

or

```javascript
provider.addAccount(privateKey)
```

From now on, you will be able to use this `fromAddress` to sign transactions:

```javascript
await myRecipient.methods.myFunction().send({ from: fromAddress });
```

::: warning
It is up to you to implement safe storage of this keypair if needed. `RelayProvider` will not store it and it will be lost on the next page refresh.
:::

## Injecting Approval Data <a id="injecting-approval-data"></a>

The GSN protocol provides a method for a Paymaster to verify an external `approvalData` (usually a signature).
This allows to implement off-chain approvals that are verified on-chain: for instance, you could have your users go through a captcha, and only then sign an approval for a transaction on your backend.
You can see an example [VerifyingPaymaster](https://github.com/opengsn/gsn-paymasters/blob/master/contracts/VerifyingPaymater.sol) which can verify a signature made by an external server, using [VerifyingPaymasterUtils.ts](https://github.com/opengsn/gsn-paymasters/blob/master/src/VerifyingPaymasterUtils.ts)


```javascript
const asyncApprovalData = async function (relayRequest: RelayRequest) {
  return Promise.resolve('0x1234567890')
}
const provider = RelayProvider.newProvider( { 
            provider: web3.currentProvider, 
            config, 
            overrideDependencies:{ asyncApprovalData })
```

## Tweaking Relay selection algoritm

Below are some functions (passed in `overrideDependencies`, like asyncApprovalData, above) that allows you to customize the
relay selection algoritm 

### Custom Relay Score Calculation

By default, relays are sorted based on the following algorithm:
- calculate the gas fee the relayer requests.
- sort lower fee first.
- if a relayer failed a transaction lately, lower its score so it moves to the end of the list.

It is possible to override this score calculation, by providing `scoreCalculator` function. see [DefaultRelayScore](https://github.com/opengsn/gsn/blob/release/src/relayclient/KnownRelaysManager.ts#L25) for the default
implementation.


### Filter out relayers

* `pingFilter` function let you filter out relays based on the ping response. The default [GasPricePingFilter](https://github.com/opengsn/gsn/blob/release/src/relayclient/RelayClient.ts#L45) filters out relayers that require gasPrice higher than client's allowed gas.


