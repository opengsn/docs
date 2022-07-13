### Network mumbai

RelayHub: [0x3a1Df71d11774F25B9d8a35DF4aF1918bff41681](https://mumbai.polygonscan.com/address/0x3a1Df71d11774F25B9d8a35DF4aF1918bff41681)

Forwarder: [0x7A95fA73250dc53556d264522150A940d4C50238](https://mumbai.polygonscan.com/address/0x7A95fA73250dc53556d264522150A940d4C50238)

WrappedEthToken: [0xBA03B53D826207c39453653f655d147d4BCBA7B4](https://mumbai.polygonscan.com/address/0xBA03B53D826207c39453653f655d147d4BCBA7B4)

Accept-Everything Paymaster: [0x327BBd6BAc3236BCAcDE0D0f4FCD08b3eDfFbc06](https://mumbai.polygonscan.com/address/0x327BBd6BAc3236BCAcDE0D0f4FCD08b3eDfFbc06)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x3a1Df71d11774F25B9d8a35DF4aF1918bff41681",
  "managerStakeTokenAddress": "0xBA03B53D826207c39453653f655d147d4BCBA7B4",
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
    paymasterAddress: "0x327BBd6BAc3236BCAcDE0D0f4FCD08b3eDfFbc06"
  }})
  await gsnProvider.init()
```

