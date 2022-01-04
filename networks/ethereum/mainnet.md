### Mainnet

RelayHub: [0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D](https://etherscan.io/address/0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D)

Forwarder: [0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA](https://etherscan.io/address/0xAa3E82b4c4093b4bA13Cb5714382C99ADBf750cA)

VersionRegistry: [0x97B6ebd38f2000B6E446DE24D9805606b882A1C5](https://etherscan.io/address/0x97B6ebd38f2000B6E446DE24D9805606b882A1C5)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 64,
  "versionRegistryAddress": "0x97B6ebd38f2000B6E446DE24D9805606b882A1C5",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 6,
  "maxGasPrice": 800e9,
  "workerMinBalance": 0.2e18,
  "workerTargetBalance": 2e18,
  "managerTargetBalance": 2.3e18,
  "registrationBlockRate": 500000,
  "ethereumNodeUrl": "<NODE_URL>>"
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 6e5,
    relayRegistrationLookupBlocks: 6e5,
    pastEventsQueryMaxPageSize: Number.MAX_SAFE_INTEGER,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
