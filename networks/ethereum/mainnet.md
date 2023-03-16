### Ethereum Mainnet Network

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x8f812FAE28a3Aa634d97659091D6540FABD234F5](https://etherscan.io/address/0x8f812FAE28a3Aa634d97659091D6540FABD234F5)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://etherscan.io/address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x8f812FAE28a3Aa634d97659091D6540FABD234F5",
  "managerStakeTokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "<PAYMASTER_ADDRESS>"
  }})
  await gsnProvider.init()
```

