### Mumbai Testnet

RelayHub: [0x6646cD15d33cE3a6933e36de38990121e8ba2806](https://explorer-mumbai.maticvigil.com/address/0x6646cD15d33cE3a6933e36de38990121e8ba2806)

Forwarder: [0x4d4581c01A457925410cd3877d17b2fd4553b2C5](https://explorer-mumbai.maticvigil.com/address/0x4d4581c01A457925410cd3877d17b2fd4553b2C5)

VersionRegistry: [0x4Fe8824c885D67613848c94a15dce7680897f33E](https://explorer-mumbai.maticvigil.com/address/0x4Fe8824c885D67613848c94a15dce7680897f33E)

Accept-Everything Paymaster: [0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A](https://explorer-mumbai.maticvigil.com/address/0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0x4Fe8824c885D67613848c94a15dce7680897f33E",
  "ownerAddress": "<OWNER_ADDRESS>",
  "registrationBlockRate": 1000,
  "pastEventsQueryMaxPageSize": 900,
  "coldRestartLogsFromBlock": 23164086,
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://matic-mumbai.chainstacklabs.com"
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 990,
    relayRegistrationLookupBlocks: 990,
    pastEventsQueryMaxPageSize: 990,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
