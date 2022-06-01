# Preparing the environment
## Configuring your contracts <a id="configure_contracts"></a>

After your contract is changed to inherit `ERC2771Recipient`, and you are satisfied with your implementation of `BasePaymaster`, it is time to wrap it all together.

### Configuring a [Forwarder](../contracts/index.md#trusted_forwarder)

Your Recipient will only accept relayed transactions coming from a specific dedicated address.
There is no need to deploy it on public/testnets, as there is already a pre-deployed one on each supported network.
the `gsn start` script deploys it when running on local network.

In your recipient contract, you must call `_setTrustedForwarder()` with this address.
This method is internal.

Typically, this method is called in the constructor.

You may select to expose it as an external function - just make sure to protect it with `ownerOnly` or equivalent mechanism.

### Configuring a [Paymaster](../contracts/index.md#paymaster) <a id="paymaster"></a>

When deploying a Paymaster, it must be configured with forwarder and relayhub for your network.

The paymaster will only accept recipient contracts that use the same forwarder. On most networks, there is going to be exactly one forwarder.

Next step is to ensure the Paymaster has enough ether deposited to the `RelayHub' to pay for transaction.

```javascript
const depositAmount = 1e18;
await relayHub.depositFor(paymaster, { from: accountWithMoney, value: depositAmount });
```


### Running your own production relay server

If you are interested in running your own production relay server on a real network, refer to [these instructions](/relay-server/deployment-reference.md).

