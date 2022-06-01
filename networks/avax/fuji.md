### Fuji Testnet

RelayHub: [0x0321ABDba4dCf3f3AeCf463Def8F866568BC5174](https://testnet.snowtrace.io/address/0x0321abdba4dcf3f3aecf463def8f866568bc5174)

Forwarder: [0xDFdA581eE8bf25Ade192DE74BcaE0A60b9860B33](https://testnet.snowtrace.io/address/0xdfda581ee8bf25ade192de74bcae0a60b9860b33)

Paymaster: [0x9552C037217B46398B1c928e0e5b086C5f5F4aB3](https://testnet.snowtrace.io/address/0x9552c037217b46398b1c928e0e5b086c5f5f4ab3)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0x0321ABDba4dCf3f3AeCf463Def8F866568BC5174",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://api.avax-test.network/ext/bc/C/rpc",
  "coldRestartLogsFromBlock": 7857071,
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
