# Advanced configuration

GSN aims to be a generic solution to all meta-transaction needs, and provides a lot of flexibility and composability in its configuration.

* Signing transactions with an [ephemeral key](#using-an-offline-signing-key)
* Injecting [Approval Data](#injecting-approval-data)
* Changing the GSN behaviour with [configuration](#gsnconfig)

## Using an Ephemeral Signing Key <a id="using-an-offline-signing-key"></a>

Usually in web-dapps, holding user private keys is delegated to browser extensions like MetaMask. This extensions inject the page with web3 objects and web3 providres.

The snippet above uses the same technique, delegating to the underlying `web3.currentProvider` signing of the meta-transactions to send.
This will only work if the provider has an account, which is not the case if you choose not to rely on any extension, and to use public nodes, such as infura, instead.

In order to support it, the GSN provider also provides the following `accountManager` API:

```javascript
const { RelayProvider } = require('@opengsn/gsn');
const provider = new RelayProvider(web3.currentProvider, configuration)

const keypair = provider.newAccount()
```

or

```javascript
provider.addAccount(knownKeypair)
```

From now on, you will be able to use this `keypair` to sign transactions:

```javascript
await myRecipient.methods.myFunction().send({ from: keypair.address, paymaster, forwarder });
```

{% hint style="warning" %}
### WARNING:
It is up to you to implement safe storage of this keypair if needed. `RelayProvider` will not store it and it will be lost on the next page refresh.
{% endhint %}
### Injecting Approval Data <a id="injecting-approval-data"></a>

The GSN protocol allows you to supply an arbitrary `approveData` bytes array that can be checked on the recipient contract. This allows to implement off-chain approvals that are verified on-chain: for instance, you could have your users go through a captcha, and only then sign an approval for a transaction on your backend.

To support this, the [GSN Dependencies](#dependencies) accepts an `asyncApprovalData` callback that receives all transaction parameters, and should return the approval data.

```javascript
const asyncApprovalData = async function (relayRequest: RelayRequest) {
  return Promise.resolve('0x1234567890')
}
const provider = new RelayProvider(web3.currentProvider, configuration, { asyncApprovalData })
```

### GSNDependencies <a id="dependencies"></a>

```typescript
pingFilter: PingFilter
```

Allows filtering the relay servers by their advertised ping info.

```typescript
relayFilter: RelayFilter
```

Allows filtering the relay servers by their advertised event info.

```typescript
asyncApprove: AsyncApprove
```

Allows injecting custom byte array for every relayed transaction.

```typescript
scoreCalculator: AsyncScoreCalculator
```

Allows overriding the function by which the relay scores are calculated.
### GSNConfig <a id="gsnconfig"></a>

```javascript
relayHubAddress (string)
```

Address of the `RelayHub`.

```javascript
stakeManagerAddress (string)
```

Address of the `StakeManager`.

```javascript
verbose (boolean)
```

Verbose log mode, on/off.

```javascript
preferredRelays (string[])
```

An array of URLs of relay servers to be attempted first. GSN will exhaust this list before attempting any other registered relays. +
The relay still has to be registered with the `RelayHub` in order to relay transactions.

```javascript
relayLookupWindowBlocks (number)
```

Relay Server is considered active if it has had an interaction within the last `relayLookupWindowBlocks` blocks.

```javascript
relayTimeoutGrace (number)
```

If the relay server failed to respond, it will be graylisted for the `relayTimeoutGrace` seconds.

```javascript
sliceSize (number)
```

`RelayProvider` will ping this number of relay servers simultaneously to determine the fastest relay to respond.

```javascript
gasPriceFactorPercent (number)
```

Percent of change to the average gas price as reported by the Ethereum node you are connected to. Negative value means lower-then-average gas price.

```javascript
minGasPrice (number)
```

`RelayProvider` will not try to use gas price lower than `minGasPrice` even if the average gas price is lower.

```javascript
chainId (number)
```

```javascript
maxRelayNonceGap (number)
```
