### Network Görli-Optimism

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x0F48612d2517e47D72fEc92a2fc6fd64cA6816E0](https://goerli-optimism.etherscan.io/address/0x0F48612d2517e47D72fEc92a2fc6fd64cA6816E0)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://goerli-optimism.etherscan.io/address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x735719A8C5aF199ea5b93207083787a5B548C0e2](https://goerli-optimism.etherscan.io/address/0x735719A8C5aF199ea5b93207083787a5B548C0e2)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x0F48612d2517e47D72fEc92a2fc6fd64cA6816E0",
  "managerStakeTokenAddress": "",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [](https://goerli-optimism.etherscan.io/address/) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x735719A8C5aF199ea5b93207083787a5B548C0e2"
  }})
  await gsnProvider.init()
```

