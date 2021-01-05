# Technical FAQ

## What is the difference between GSNv1 and GSNv2?

The major changes in GSNv2:

- **RelayRecipient** no longer handle its own gas. it only uses `_msgSender()` (instead of `msg.sender`) to determine its caller.
- A new entity named **Paymaster** was added. A single Paymaster can handle the gas of one or several RelayRecipient contracts
- Relays can have multiple worker addresses, so that they can have more than one outstanding tx
- Recipient trusts a single, small contract (**TrustedForwarder**) instead the entire **RelayHub** codebase (since recipient doesn't handle gas, all it cares is that the signature of the sender was verified, and the request is not a replay)

## My contract is using OpenZeppelin. How do I add GSN support?

OpenZeppelin supports GSNv1 in their libraries. They are now in the process of removing GSN from their library.
Any further GSN support is done by using OpenGSN libraries directly.

Still, they have basic support for hooking GSN in all their contracts, and that support will stay.

- Make sure you use `OpenZeppelin@3` (which support solidity 0.6)
- You should make the `_msgSender()` and `_msgData()` of both GSN and OpenZeppelin use GSN's implementation (sorry about the syntax: its a solidity requirement...)
- As any GSN contract, you must initialize the **trustedForwarder** member, either through the constructor, or via a setter (protected, so only admin/owner can set it)
- You contract should look like this:

  ```solidity
  pragma solidity ^0.6.10;
  import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";

  contract MyContract is BaseRelayRecipient, Ownable {
    function _msgSender() internal override(Context, BaseRelayRecipient)
    view returns (address payable) {
      return BaseRelayRecipient._msgSender();
    }

    function _msgData() internal override(Context,BaseRelayRecipient)
    view returns (bytes memory ret) {
      return BaseRelayRecipient._msgData();
    }

    string public override versionRecipient = "2.0.0";

    function setForwarder(address forwarder) public onlyOwner {
      trustedForwarder = forwarder;
    }
    ...
  }
  ```


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


## I have multiple tests. each run ok, but running them together, I get "Unacceptable relayMaxNonce"

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
