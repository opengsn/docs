### Network ropsten

RelayHub: [0xC11Cf08ED047A1D49d2BfEBa4880cEFe290e3813](https://ropsten.etherscan.io/address/0xC11Cf08ED047A1D49d2BfEBa4880cEFe290e3813)

Forwarder: [0x7A95fA73250dc53556d264522150A940d4C50238](https://ropsten.etherscan.io/address/0x7A95fA73250dc53556d264522150A940d4C50238)

WrappedEthToken: [0x1368e39E3CB40C3dFb06d2cB8E5fca6a847D16E6](https://ropsten.etherscan.io/address/0x1368e39E3CB40C3dFb06d2cB8E5fca6a847D16E6)

Accept-Everything Paymaster: [0x3A0b6272C2346842566Ed00773298FE3c410BfB8](https://ropsten.etherscan.io/address/0x3A0b6272C2346842566Ed00773298FE3c410BfB8)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xC11Cf08ED047A1D49d2BfEBa4880cEFe290e3813",
  "managerStakeTokenAddress": "0x1368e39E3CB40C3dFb06d2cB8E5fca6a847D16E6",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```
#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x3A0b6272C2346842566Ed00773298FE3c410BfB8"
  }})
  await gsnProvider.init()
```
