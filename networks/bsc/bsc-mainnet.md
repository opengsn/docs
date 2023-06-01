### Network Binance-Smart-Chain-Mainnet

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0xBfCB3c7FF9B3DE0e0F673818309BfB73ec27bB9F](https://bscscan.com//address/0xBfCB3c7FF9B3DE0e0F673818309BfB73ec27bB9F)

Forwarder: [0x2e3e3c36a5D01CCf4637cF9624c9d1033e337EA1](https://bscscan.com//address/0x2e3e3c36a5D01CCf4637cF9624c9d1033e337EA1)

Accept-Everything Paymaster: [0x4F74dB5803d2F6C8246262F1e724d51Cb9537c7A](https://bscscan.com//address/0x4F74dB5803d2F6C8246262F1e724d51Cb9537c7A)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xBfCB3c7FF9B3DE0e0F673818309BfB73ec27bB9F",
  "managerStakeTokenAddress": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c](https://bscscan.com//address/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x4F74dB5803d2F6C8246262F1e724d51Cb9537c7A"
  }})
  await gsnProvider.init()
```

