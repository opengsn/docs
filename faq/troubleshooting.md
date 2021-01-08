# Troubleshooting

## "signature mismatch" when using Metamask with local ganache

Once initial tests are running, its time to run a test using a browser against a local chain, running on ganache.

But when trying to run from a browser with your local ganahce, you often see an error message: **signature mismatch**

Metamask has a [bug](https://github.com/MetaMask/metamask-extension/issues/8385) that confuses network-id and chain-id when handling the rpc call **`signTypedData()`**. Metamask can only work properly on networks with these are the same (which means it can't work with ganache or Ethereum Classic, or several other networks that passed a network fork)

Thankfully, Ganache lately a new version (v6.11.0) that fixes their [bug](https://github.com/trufflesuite/ganache-core/issues/515). so now you can bring up ganache in a way that is compatible with Metamask.

Start ganache with this command line (good for Linux and Mac)

```sh
net=`date "+%j%H%M%S"` ganache-cli --networkId $net --chainId $net
```

This will keep the normal ganache property of new networkId on each restart, but also make sure the chainId is the same as networkId.

This way, you can open a browser (or command-line tests) and use Metamask to connect to GSN.

## Error: Provided Hub version(2.0) is not supported by the current interactor(2.0.3)

The **Paymaster** version is wrong: The client checks that it is compatible with all the contracts.
This happens when you create a custom paymaster with a version string that is less than 2.0.0


## I get an error: paymaster rejected in local view call to 'relayCall()' : Forwarder is not trusted

The paymaster doesn't support the forwarder that is used by your target contract.
make sure to set the `trustedForwarder` on both the paymaster an recipient contract, and use the same forwarder.


## I have multiple tests, each run ok, but running them together, I get "Unacceptable relayMaxNonce"

There is an issue with the way a relayer currently work and Truffle's `contract()` test construct.
Please use `describe()` or `context` instead (and avoid to snapshot/revert while a relayer is running)

An alternative is to start relayer in the `begin()` block of the contact.
Just note that you need to recreate the provider, and update the forwarder for your contracts.
e.g:

```js
contract('mytest', ()=> {
  before(async()=> {
    await GsnTestEnvironment.startGsn('localhost')
    const { forwaderAddress, paymasterAddress } = GsnTestEnvironment.loadDeployment()
    provider = RelayProvider.newProvider({provider: web3.currentProvider, config: { paymasterAddress}})
  })

  after(async()=> {
    await GsnTestEnvironment.stopGsn()
  })
}

```
  
}



## Using Gatsby framework, I get an error: Can't resolve 'fs' 

Add this configuration file `gatsby-node.js` in the root of your project:
```js
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
        node: {
          fs: 'empty'
        }
  })
}
```
