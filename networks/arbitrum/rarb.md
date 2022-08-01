### Network Arbitrum Rinkeby

RelayHub: [0x9E0F60f978dA992b86fDdF1f158f9A381308A47E](https://testnet.arbiscan.io/address/0x9E0F60f978dA992b86fDdF1f158f9A381308A47E)

Forwarder: [0x344f43702786Ac2bF3972f0925e5BB8E9d7a9E64](https://testnet.arbiscan.io/address/0x344f43702786Ac2bF3972f0925e5BB8E9d7a9E64)

Accept-Everything Paymaster: [0x6E8DA173c946FC75AD73F46c104001aF3Ee8B0da](https://testnet.arbiscan.io/address/0x6E8DA173c946FC75AD73F46c104001aF3Ee8B0da)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "",
  "managerStakeTokenAddress": "0x4C6cc053d802fF96952c825CB4c490c4A5E59f88",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0x4C6cc053d802fF96952c825CB4c490c4A5E59f88](https://testnet.arbiscan.io/address/0x4C6cc053d802fF96952c825CB4c490c4A5E59f88) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x6E8DA173c946FC75AD73F46c104001aF3Ee8B0da"
  }})
  await gsnProvider.init()
```

