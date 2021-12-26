### Optimism Mainnet

RelayHub: [0x6f00F1A7BdB7E2E407385263B239090bCdb6b442](https://optimistic.etherscan.io/address/0x6f00F1A7BdB7E2E407385263B239090bCdb6b442)

VersionRegistry: [0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472](https://optimistic.etherscan.io/address/0xD8Cf3315FFD1A3ec74Dc2B02908AF60e5E330472)

Forwarder: [0x67097a676FCb14dc0Ff337D0D1F564649aD94715](https://optimistic.etherscan.io/address/0x67097a676FCb14dc0Ff337D0D1F564649aD94715)

Accept-Everything Paymaster: [0x28E036dB9727a9d5ee9373DBAAe14B422D83a017](https://optimistic.etherscan.io/address/0x28E036dB9727a9d5ee9373DBAAe14B422D83a017)

#### Recommeneded Server configuration
gsn-relay-config.json:
```
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0x6f00F1A7BdB7E2E407385263B239090bCdb6b442",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://optimism-mainnet.infura.io/v3/<INFURA_ID>",
  "coldRestartLogsFromBlock": 1245868,
  "pastEventsQueryMaxPageSize": 9999,
  "registrationBlockRate": 250000,
  "workerMinBalance": 0.001e18,
  "workerTargetBalance": 0.01e18,
  "managerMinBalance": 0.02e18,
  "managerTargetBalance": 0.05e18,
  "minHubWithdrawalBalance": 0.01e18
}
```
#### Recommeneded client configuration
```
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 250000,
    relayRegistrationLookupBlocks: 250000,
    pastEventsQueryMaxPageSize: 9900,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
