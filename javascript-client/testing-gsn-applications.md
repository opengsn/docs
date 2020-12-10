# Testing GSN Applications

A GSN-capable smart contract or web application cannot be properly tested without interacting with relayers and the `RelayHub` contract. While these exist on [all testnets](networks.md), it is often desirable to be able to perform tests on a _local_ blockchain.

This guide will teach you how to have a slimmed-down version of the GSN on your development machine.


## Deploying the RelayHub Contract and starting a local GSN server <a id="deploying_the_relayhub_contract_and_starting_a_local_gsn_server"></a>

The on-chain part of the GSN cannot be stubbed or faked: the contracts will only recognize the canonical addresses.

Doing this locally however is not a complex process. Just run:
```
gsn start
```
And the GSN Helper tool will deploy all the necessary contracts and start the relayer process for you.

Head to the [*GSN Helpers*](gsn-helpers.md) to learn more.


//== Using the Development Provider
//
//In addition to the `RelayProvider`, this package includes `GSNDevProvider`: a provider that _also_ acts as a GSN relayer.
//
//Any transactions sent through it will be signed by the sender, and relayed by another address. By default, it will register itself in the relay hub as `http://localhost:{available_port}/`.
//
//{% hint style="note" %}
### NOTE:
The `GSNDevProvider` still needs `RelayHub` to be deployed on the network.
{% endhint %}
//
//It requires and addresses with funds to act as the relayer owner (who will register it on the `RelayHub`).
//
//```javascript
//const { GSNDevProvider } = require("@opengsn/gsn");
//
// Assuming you are running a truffle test and did not modify the Web3 yet, you can do:
//const regularProvider = web3.currentProvider
//
//const devConfig = {
//    relayOwner: accounts[0],
//    relayHubAddress: relayHub.address
//}
//const gsnDevProvider = new GSNDevProvider(regularProvider, devConfig);
//web3.setProvider(devProvider);
//```
//
//The `GSNDevProvider` is used in the same way as the regular `RelayProvider`: transactions sent using it will go over the GSN by default.
//
//With this setup in place, you will be able to test interactions that rely on the `preRelayedCall` and `postRelayedCall` methods of your contracts. However, unlike regular relayers `GSNDevProvider` will never fail: this part of the testing process needs to be carried out on a real network.
//
//[[devgsnconfig]]
//=== DevGSNConfig
//
//In addition to the `GSNConfig`, the `GSNDevProvider` can be configured with following parameters:
//
//```javascript
//relayOwner (string)
//```
//
//Account to be used to register and maintain the balance. Must be unlocked and hold ether.
//
//```javascript
//relayWorkdir (string)
//```
//
//Folder to store the database of the local test relay server.
//
//```javascript
//relayListenPort (number)
//```
//
//Port to use for the local test relay server.
//
//```javascript
//relayUrl (string)
//```
//
//The URL to use for the local test relay server.
//
//```javascript
//baseRelayFee (number)
//```
//```javascript
//pctRelayFee (number)
//```
//```javascript
//gasPriceFactor (number)
//```
//```javascript
//devMode (bool)
//```
