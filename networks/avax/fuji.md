### Network fuji

RelayHub: [0xb8e1346CB0cf64F34698cf25702015BCB85bD535](https://fuji.etherscan.io/address/0xb8e1346CB0cf64F34698cf25702015BCB85bD535)

Forwarder: [0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc](https://fuji.etherscan.io/address/0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc)

WrappedEthToken: [0xb4Bbb5e968e278C6541addBC24b903712746f102](https://fuji.etherscan.io/address/0xb4Bbb5e968e278C6541addBC24b903712746f102)

Accept-Everything Paymaster: [0x5B79B2291BaF5213a34d0f16B4865408452D5385](https://fuji.etherscan.io/address/0x5B79B2291BaF5213a34d0f16B4865408452D5385)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xb8e1346CB0cf64F34698cf25702015BCB85bD535",
  "token": "0xb4Bbb5e968e278C6541addBC24b903712746f102",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "registrationBlockRate": 500000,
  "ethereumNodeUrl": "<NODE_URL>>"
}
```

#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x5B79B2291BaF5213a34d0f16B4865408452D5385"
  }})
  await gsnProvider.init()
```
