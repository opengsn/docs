# Migrating from GSNv2 to GSNv3

This document outlines the changes to the code for applications to move from GSNv2 to GSNv3

## Needed Modifications to existing apps

### Modifications to GSN-enabled target contracts.

When developing a GSN-enabled contract, the contract to inherit from was renamed from `BaseRelayRecipent`, to `ERC2771Recipient`.
Note that our `ERC2771Recipient` and OpenZeppelin's `ERC2771ContextUpgradeable` are essentially the same. You can use whichever you wish.

If you have deployed contracts, you can continue and use the same contract.
Just note that you need to switch to the new `Forwarder`. If your contract is Ownable, and has a `setTrustedForwarder()` method then use it to update the forwarder.

You should remove the **versionRecipient()** method, as we no longer require it.

### Paymaster development

The Paymaster's APIs didn't change, but they do require re-compilation.
There is only a slight modification in the way `postRelayedCall` is used: previously, this method was always called after the relayed call.
With GSN3, it is called **only if preRelayedcall returns a context**.
That is, if your Paymaster needs any post-processing, it obviously has to pass some context to it from the preRelayedCall.
This way, "light" paymaster become slightly lighter

### Frontend application
The RelayProvider API was left almost unchanged - you might need to **remove** network-specific configuration parameters, as we made the configuration simpler, and also read network-specific defaults from the server.

#### New ethers-based API
You can experiment with the new APIs that let you work directly with ethers, instead of wrapping `windows.ethereum`
Assuming that you have in your code an ethers contract connected to the network:
```js
myContract = new ethers.Contract(...)
```
In order to use it with GSN all you need to do is:
```js
gsnContract = await wrapContract(myContract, gsnConfig)
```
the new "gsnContract" now exposes the same API as the original myContract. events and view calls are unchanged,
but it will use GSN to make transaction.

