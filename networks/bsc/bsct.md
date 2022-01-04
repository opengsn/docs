### BSC Testnet

RelayHub: [0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA](https://testnet.bscscan.com/address/0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA)

VersionRegistry: [0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D](https://testnet.bscscan.com/address/0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D)

Forwarder: [0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB](https://testnet.bscscan.com/address/0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB)

Accept-Everything Paymaster: [0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d](https://testnet.bscscan.com/address/0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://data-seed-prebsc-1-s1.binance.org:8545",
  "registrationBlockRate": 4990,
  "pastEventsQueryMaxPageSize": 999,
  "workerMinBalance" : 10000000000000000,
  "workerTargetBalance" : 10000000000000000,
  "managerMinBalance": 10000000000000000,
  "coldRestartLogsFromBlock": 14624603
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 4990,
    relayRegistrationLookupBlocks: 4990,
    pastEventsQueryMaxPageSize: 999,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
