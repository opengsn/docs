### Kotti ETC Testnet

RelayHub: [0xAdB0B519873860F396F8d6642286C179A5A0770D](https://blockscout.com/etc/kotti/address/0xAdB0B519873860F396F8d6642286C179A5A0770D)

Forwarder: [0x255fc98fE2C2564CF361E6dCD233862f884826E5](https://blockscout.com/etc/kotti/address/0x255fc98fE2C2564CF361E6dCD233862f884826E5)

VersionRegistry: [0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3](https://blockscout.com/etc/kotti/address/0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3)

Accept-Everything Paymaster: [0x41ddb318BB35cA0aD54b52f5b1708ff860161dCc](https://blockscout.com/etc/kotti/address/0x41ddb318BB35cA0aD54b52f5b1708ff860161dCc)

#### Recommeneded Server configuration
gsn-relay-config.json:
```
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "<NODE_URL>>"
}
```
#### Recommeneded client configuration
```
  // add the following fields to your GSNConfig:
  const gsnConfig: Partial<GSNConfig> = {
    relayLookupWindowBlocks: 6e5,
    maxViewableGasLimit: 5e6,
    relayRegistrationLookupBlocks: 6e5,
    pastEventsQueryMaxPageSize: Number.MAX_SAFE_INTEGER,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
