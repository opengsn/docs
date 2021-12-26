### ETC Mainnet

RelayHub: [0xDC8B38D05Be14818EE6d1cc4E5245Df6C52A684E](https://blockscout.com/etc/mainnet/address/0xDC8B38D05Be14818EE6d1cc4E5245Df6C52A684E)

Forwarder: [0x0DEEF5a1e5bF8794A5145e052E24A852a081AF65](https://blockscout.com/etc/mainnet/address/0x0DEEF5a1e5bF8794A5145e052E24A852a081AF65)

VersionRegistry: [0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3](https://blockscout.com/etc/kotti/address/0x581648Bb9dB7e36360B8B551Cdaf23c481f106c3)

#### Recommeneded Server configuration
gsn-relay-config.json:
```
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0x10E207898E76137bb27b31609a275b0635080632",
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
    relayRegistrationLookupBlocks: 6e5,
    pastEventsQueryMaxPageSize: Number.MAX_SAFE_INTEGER,
  }
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: gsnConfig})
  await gsnProvider.init()
```
