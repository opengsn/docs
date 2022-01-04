### Optimism Testnet (kovan)

RelayHub: [0xceEd6F194C07EB606ae0F3899DdfA7dE8a4ABcB5](https://kovan-optimistic.etherscan.io/address/0xceEd6F194C07EB606ae0F3899DdfA7dE8a4ABcB5)

VersionRegistry: [0xf7D1b4f7B20B4bC1b4dc1E09B709edA31123193c](https://kovan-optimistic.etherscan.io/address/0xf7D1b4f7B20B4bC1b4dc1E09B709edA31123193c)

Forwarder: [0x39A2431c3256028a07198D2D27FD120a1f81ecae](https://kovan-optimistic.etherscan.io/address/0x39A2431c3256028a07198D2D27FD120a1f81ecae)

Accept-Everything Paymaster: [0x6B43C92C4661c8555D5D060144457D9bF0fD0D34](https://kovan-optimistic.etherscan.io/address/0x6B43C92C4661c8555D5D060144457D9bF0fD0D34)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0xceEd6F194C07EB606ae0F3899DdfA7dE8a4ABcB5",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "https://kovan.optimism.io/",
  "coldRestartLogsFromBlock": 0,
  "registrationBlockRate": 0,
  "pastEventsQueryMaxPageSize": 9007199254740991
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
