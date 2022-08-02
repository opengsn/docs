### Avalanche Mainnet

RelayHub: [0xafAFDac90164e4b2D4e39a1ac3e9dBC635dbbEA5](https://snowtrace.io/address/0xafAFDac90164e4b2D4e39a1ac3e9dBC635dbbEA5)

Forwarder: [0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d](https://snowtrace.io/address/0x01a5a06C5Ba6E5f8FC9CB060492fae1b3d03c69d)

Paymaster: [0x10E207898E76137bb27b31609a275b0635080632](https://snowtrace.io/address/0x10E207898E76137bb27b31609a275b0635080632)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xafAFDac90164e4b2D4e39a1ac3e9dBC635dbbEA5",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://api.avax.network/ext/bc/C/rpc",
  "coldRestartLogsFromBlock": 12161392,
  "registrationBlockRate": 3800,
  "pastEventsQueryMaxPageSize": 2000,
  "maxGasPrice": 1e12,
  "workerMinBalance": 0.1e18,
  "workerTargetBalance": 0.5e18
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 4000,
    relayRegistrationLookupBlocks: 4000,
    pastEventsQueryMaxPageSize: 2000,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
