### Rinkeby Testnet

RelayHub: [0x6650d69225CA31049DB7Bd210aE4671c0B1ca132](https://rinkeby.etherscan.io/address/0x6650d69225CA31049DB7Bd210aE4671c0B1ca132)

Forwarder: [0x83A54884bE4657706785D7309cf46B58FE5f6e8a](https://rinkeby.etherscan.io/address/0x83A54884bE4657706785D7309cf46B58FE5f6e8a)

VersionRegistry: [0xedD8C4103acAd42F7478021143E29e1B05aD85C6](https://rinkeby.etherscan.io/address/0xedD8C4103acAd42F7478021143E29e1B05aD85C6)

Accept-Everything Paymaster: [0xA6e10aA9B038c9Cddea24D2ae77eC3cE38a0c016](https://rinkeby.etherscan.io/address/0xA6e10aA9B038c9Cddea24D2ae77eC3cE38a0c016)

#### Recommeneded Server configuration
gsn-relay-config.json:
```
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0xedD8C4103acAd42F7478021143E29e1B05aD85C6",
  "ownerAddress": "<owner_address>",
  "gasPriceFactor": 1,
  "registrationBlockRate": 500000,
  "ethereumNodeUrl": "<node_url>"
}
```
