### Network Polygon

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B](https://polygonscan.com//address/0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://polygonscan.com//address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x9e662d0ce3Eb47761BaC126aDFb27F714d819898](https://polygonscan.com//address/0x9e662d0ce3Eb47761BaC126aDFb27F714d819898)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B",
  "managerStakeTokenAddress": "",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [](https://polygonscan.com//address/) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x9e662d0ce3Eb47761BaC126aDFb27F714d819898"
  }})
  await gsnProvider.init()
```

