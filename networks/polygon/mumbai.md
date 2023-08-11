### Network Mumbai

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x3232f21A6E08312654270c78A773f00dd61d60f5](https://mumbai.polygonscan.com/address/0x3232f21A6E08312654270c78A773f00dd61d60f5)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://mumbai.polygonscan.com/address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x086c11bd5A61ac480b326916656a33c474d1E4d8](https://mumbai.polygonscan.com/address/0x086c11bd5A61ac480b326916656a33c474d1E4d8)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x3232f21A6E08312654270c78A773f00dd61d60f5",
  "managerStakeTokenAddress": "0x823e81FF03470d3d705Dc5a1e5d0ae78Bbc8B139",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0x823e81FF03470d3d705Dc5a1e5d0ae78Bbc8B139](https://mumbai.polygonscan.com/address/0x823e81FF03470d3d705Dc5a1e5d0ae78Bbc8B139) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x086c11bd5A61ac480b326916656a33c474d1E4d8"
  }})
  await gsnProvider.init()
```

