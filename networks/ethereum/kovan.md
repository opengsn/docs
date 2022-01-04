### Kovan Testnet

RelayHub: [0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd](https://kovan.etherscan.io/address/0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd)

Forwarder: [0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED](https://kovan.etherscan.io/address/0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED)

VersionRegistry: [0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3](https://kovan.etherscan.io/address/0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3)

Accept-Everything Paymaster: [0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d](https://kovan.etherscan.io/address/0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "registrationBlockRate": 500000,
  "ethereumNodeUrl": "<NODE_URL>>"
}
```
#### Recommeneded client configuration
```js
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: Number.MAX_SAFE_INTEGER,
    relayRegistrationLookupBlocks: Number.MAX_SAFE_INTEGER,
    pastEventsQueryMaxPageSize: Number.MAX_SAFE_INTEGER,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
