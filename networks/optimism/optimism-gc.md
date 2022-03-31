### Optimism Gnosis Chain (xdai)

RelayHub: [0x6f00F1A7BdB7E2E407385263B239090bCdb6b442](https://blockscout.com/xdai/optimism/address/0x6f00F1A7BdB7E2E407385263B239090bCdb6b442)

VersionRegistry: [0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472](https://blockscout.com/xdai/optimism/address/0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472)

Forwarder: [0x67097a676FCb14dc0Ff337D0D1F564649aD94715](https://blockscout.com/xdai/optimism/address/0x67097a676FCb14dc0Ff337D0D1F564649aD94715)

Accept-Everything Paymaster: [0x28E036dB9727a9d5ee9373DBAAe14B422D83a017](https://blockscout.com/xdai/optimism/address/0x28E036dB9727a9d5ee9373DBAAe14B422D83a017)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0x6f00F1A7BdB7E2E407385263B239090bCdb6b442",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://optimism.gnosischain.com/",
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
