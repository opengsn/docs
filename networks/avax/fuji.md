### Network Avalanche Fuji Testnet

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x2d493cde51adc74D4494b3dC146759cF32957A23](https://testnet.snowtrace.io/address/0x2d493cde51adc74D4494b3dC146759cF32957A23)

Forwarder: [0x7A95fA73250dc53556d264522150A940d4C50238](https://testnet.snowtrace.io/address/0x7A95fA73250dc53556d264522150A940d4C50238)

Accept-Everything Paymaster: [0x1e4D8ebd5071d117Bcf351E3D53E34620D3ac190](https://testnet.snowtrace.io/address/0x1e4D8ebd5071d117Bcf351E3D53E34620D3ac190)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x2d493cde51adc74D4494b3dC146759cF32957A23",
  "managerStakeTokenAddress": "0xb4Bbb5e968e278C6541addBC24b903712746f102",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0xb4Bbb5e968e278C6541addBC24b903712746f102](https://testnet.snowtrace.io/address/0xb4Bbb5e968e278C6541addBC24b903712746f102) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x1e4D8ebd5071d117Bcf351E3D53E34620D3ac190"
  }})
  await gsnProvider.init()
```

