# Getting Started

## Working examples <a id="working_example"></a>

Working code can be worth a thousand words, so a good place to start is the
[GSN integration workshop](https://github.com/opengsn/workshop) which shows a
barebones dapp before and after GSN integration.

Another resource is [Capture The Flag](https://github.com/opengsn/ctf-react), 
which is the same "capture the flag" game, but as a React application.

## Adding GSN support to existing App

Adding GSN involves 4 steps

1. [Start GSN on your network](#start-gsn)
2. [Add GSN to your contract](#add-to-contract)
3. [Select a paymaster and forwarder contract addresses](#select-paymaster)
4. [Add GSN RelayProvider in your app](#add-provider)


### Start GSN on your network. <a id='start-gsn'></a>

GSN is already deployed to many testnets (and mainnets) - see the full list [here](/networks).
But for testing it locally, you need start it over your local `ganache` instance.
To start GSN on local ganache, run the command:
```bash
npx gsn start
```

You can also run a process with both Hardhat node and GSN instance running in background by executing a command:
```bash
npx run-with-gsn 'ls'
```

### Add GSN to your contract <a id='add-to-contract'></a>
When receiving a native transaction, a contract accesses the `msg.sender` in order to recognize the caller.
When receiving meta (relayed) transactions, the sender is different, so you must inherit
a special base contract (**ERC2771Recipient**) and use a helper method called `_msgSender()` to get the
address of the sender.

Note that your contract continues to work normally when called directly (without GSN) - in this case `_msgSender()` 
returns the real (`msg.sender`) sender unmodified.

You also need to have a `forwarder`, which is the contract you will receive the calls through.

```javascript
import "@opengsn/contracts/src/ERC2771Recipient";

contract MyContract is ERC2771Recipient {
    constructor(address forwarder) {
        _setTrustedForwarder(forwarder);
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

We also deploy such a paymaster on all [test networks](/networks.md)
For obvious reasons, there is no such "accept everything" paymaster on mainnets - any such deployed paymaster will soon get depleted by hackers.

### Use GSN RelayProvider in your app <a id="add-provider"></a>

Once your contract is set, you need to use a RelayProvider to access your contract. This is a wrapper to the regular web3 provider. All "view" operations are sent directly, but all transactions
are relayed through GSN

```javascript
const { RelayProvider } = require('@opengsn/provider')

const config = { 
    paymasterAddress,
    loggerConfiguration: {
        logLevel: 'debug'
    }
}
const provider = await RelayProvider.newProvider({ provider: web3.currentProvider, config }).init()
const web3 = new Web3(provider);
```

With these changes, your application will route the requests through GSN.

To see that the sender address doesn't have to have eth, you can create a new one:
```js
    from = provider.newAccount().address
```
or using web3:
```js
    from = web3.eth.personal.newAccount('pwd')
```

See [advanced](advanced.md) section for all available configuration parameters. 

Once you have connected your web3 instance to a `RelayProvider`, all transactions sent to contracts will be automatically routed through GSN:

```javascript
const myRecipient = new web3.eth.Contract(abi, address);

// Sends the transaction via the GSN
await myRecipient.methods.myFunction().send({ from });
```


### Adding TypeScript types

If your project is using TypeScript, you may need to add the following lines to your `tsconfig.json` file:

```json
{
  "include": [
    "node_modules/@opengsn/contracts/types/truffle-contracts/index.d.ts",
    "node_modules/@opengsn/contracts/types/truffle-contracts/types.d.ts"
  ]
}

```

### Running GSN on a local network

GSN is deployed on all major test and public [networks](/networks.md). 
In order to test it locally with ganache, you need to deploy it locally.

See [gsn start](gsn-helpers.md#start) on how to start it locally, on your ganache instance.
