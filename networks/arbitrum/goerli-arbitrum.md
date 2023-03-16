### Network Görli-Arbitrum

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x064Ddcc99C7D0FDC8E2aB4f9330d5F603F9A8435](https://goerli.arbiscan.io/address/0x064Ddcc99C7D0FDC8E2aB4f9330d5F603F9A8435)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://goerli.arbiscan.io/address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x9dC769B8cBD07131227b0815BEd3526b1f8ACD52](https://goerli.arbiscan.io/address/0x9dC769B8cBD07131227b0815BEd3526b1f8ACD52)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x064Ddcc99C7D0FDC8E2aB4f9330d5F603F9A8435",
  "managerStakeTokenAddress": "",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [](https://goerli.arbiscan.io/address/) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x9dC769B8cBD07131227b0815BEd3526b1f8ACD52"
  }})
  await gsnProvider.init()
```

