# Preparing the environment
## Configuring your contracts <a id="configure_contracts"></a>

After your contract is changed to inherit `BaseRelayRecipient`, and you are satisfied with your implementation of `BasePaymaster`, it is time to wrap it all together.


### Configuring a [Forwarder](../contracts/index.md#trusted_forwarder)

Your Recipient will only accept relayed transactions coming from a specific dedicated address.
You can choose to deploy the default `Forwarder` from your Recipient's solidity code, or using the Truffle migrations or equivalent.

::: warning
It is up to the contract with accepts relayed transactions, the one that inherits from `BaseRelayRecipient`, 
:::
to initialize the `trustedForwarder` field correctly.
### Configuring a [Paymaster](../contracts/index.md#paymaster) <a id="paymaster"></a>

The Paymaster contract has to be deployed the same way the rest of your contracts are. If you are new to dapp development we recommend getting familiar with [Truffle](https://www.trufflesuite.com/truffle).

After it is deployed, you will need to call its `setRelayHub` method with an address of the RelayHub. In a real supported blockchain this address is constant and 
will be advertised [on this website](/networks.md). For local test environment spin-up instructions, refer to our 
[testing manual](testing-gsn-applications.md), or just look in the output of `gsn start`.

Next step is to ensure the Paymaster has enough ether deposited to the `RelayHub':

```javascript
const depositAmount = 1e18;
await relayHub.depositFor(paymaster, { from: accountWithMoney, value: depositAmount });
```


### Running your own production relay server

If you are interested in running your own production relay server on a real network, refer to [these instructions](/relay-server/deployment-reference.md).

