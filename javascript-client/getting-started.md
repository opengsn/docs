# Getting Started


## See yourself <a id="see_yourself"></a>

One working example is worth a thousand tutorials. Head to the [MetaCoin](https://github.com/opengsn/metacoin) repo, check out the code and explore!

A more elaborate example, which also uses react is the [Capture The Flag](https://github.com/opengsn/ctf-react) 

```bash
git clone git@github.com:opengsn/metacoin.git
cd metacoin
npm install

npx gsn-with-ganache
```
You have now a running ganache instance, with active GSN 

In another window, run:
```
# deploy MetaCoin contract and start local web server
npx truffle migrate && npm run dev
```

If you want more control over the local GSN instance, you can start in one window ganache, and in another window do `npx gsn start`

## Adding GSN support to existing App

Adding GSN involves 4 steps

1. [Start GSN on your network](#start-gsn)
2. [Add GSN to your contract](#add-to-contract)
3. [Select a paymaster and forwarder contract addresses](#select-paymaster)
4. [Add GSN RelayProvider in your app](#add-provider)


### Start GSN on your network. <a id='start-gsn'></a>

GSN is already deployed to many testnets (and mainnets) - see the full list here.
But for testing it locally, you need start it over your local `ganache` instance.
To start GSN on local ganache, run the command:
```
npx gsn start
```

Or, if you like to run it together with ganache, add a script command:
```json
  "scripts": {
    "gsn-with-ganache": "run-with-testrpc --networkId 1337 --chainId 1337 'gsn start'"
  }
```

### Add GSN to your contract <a id='add-to-contract'></a>
When receiving a meta-transaction, a contract must be able to recognize the caller, which is usually `msg.sender`
When receiving meta (relayed) transactions, the sender is different, so you must inherit
a specific baseclass (BaseRelayRecipient) and use helper method `_msgSender()` to get the
address of the sender.
You also need have a`forwarder`, which is the contract you will receive the calls through.
See "delpoyment" below on how to set its value.

```javascript
import "@opengsn/gsn/contracts/BaseRelayRecipient";

contract MyContract is BaseRelayRecipient {
    constructor(address forwarder) {
        trustedForwarder = forwarder;
    }

    ... your contract code
}
```

### Select a paymaster and forwarder <a id="select-paymaster"></a>

The forwarder address is needed when deploying your contract. We have a forwarder deployed on each network.
On your local ganache environment, the `gsn start` script described above saves locally the contract
addresses, so you can deploy your contract as follows:

```javascript
    // assuming this script is in "test" or "src" folder, 
    const forwarder = require( '../build/gsn/Forwarder').address
    myContract = MyContract.new(forwarder)
```

The Paymaster contract is the one which will actually pay for the transaction.
For testing purposes, our `gsn start` deploys a paymaster that will accept and pay for all transactions.

```javascript
    const paymaster = require('../build/gsn/Paymaster').address
```

We also deploy such a paymaster on all [test networks](../deployments/networks.md)
For obvious reasons, there is no such "accept everytihing" paymaster on mainnets - any such deployed paymaster will soon get depleted by hackers.

### Add Use GSN RelayProvider in your app <a id="add-provider"></a>

Once your contract is set, you need to use a RelayProvider to access your contract. This is a wrapper to the regular web3 provider. All "view" operations are sent directly, but all transactions
are relayed through GSN

```javascript
const { RelayProvider } = require('@opengsn/gsn')

const config = { paymasterAddress }
const provider = await RelayProvider.newProvider({ provider: web3.currentProvider, config }).init()
const web3 = new Web3(provider);
```

With these changes, your application will route the requests through GSN.

To see that the sender address doesn't have to have eth, you can create a new one:
```
    from = provider.newAccount().address
```
or using web3:
```
    from = web3.personal.newAccount('pwd')
```
 The sender address 
doesn't have to have any eth - if you're using metamask, you'll notice that it pops up a "sign" request, which cost you nothing, and not "send transaction"

See [advanced](advanced.md) section for all available configuration parameters. 

Once you have connected your web3 instance to a `RelayProvider`, all transactions sent to contracts will be automatically routed through GSN:

```javascript
const myRecipient = new web3.eth.Contract(abi, address);

// Sends the transaction via the GSN
await myRecipient.methods.myFunction().send({ from });

// Disable GSN for a specific transaction (but require that the sender has eth!)
await myRecipient.methods.myFunction().send({ from, useGSN: false });
```


