### Network Gnosis Chain (formerly xDAI)

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0xFD81BeBA349d6a1ffaFb47db59E785c69479ab47](https://gnosisscan.io//address/0xFD81BeBA349d6a1ffaFb47db59E785c69479ab47)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://gnosisscan.io//address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B](https://gnosisscan.io//address/0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xFD81BeBA349d6a1ffaFb47db59E785c69479ab47",
  "managerStakeTokenAddress": "",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [](https://gnosisscan.io//address/) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0xfCEE9036EDc85cD5c12A9De6b267c4672Eb4bA1B"
  }})
  await gsnProvider.init()
```

