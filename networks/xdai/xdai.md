### XDai Mainnet

RelayHub: [0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd](https://blockscout.com/poa/xdai/address/0x727862794bdaa3b8Bc4E3705950D4e9397E3bAfd)

Forwarder: [0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED](https://blockscout.com/poa/xdai/address/0x7eEae829DF28F9Ce522274D5771A6Be91d00E5ED)

VersionRegistry: [0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3](https://blockscout.com/poa/xdai/address/0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3)

Accept-Everything Paymaster: [0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D](https://blockscout.com/poa/xdai/address/0x9e59Ea5333cD4f402dAc320a04fafA023fe3810D)

#### Recommeneded Server configuration
gsn-relay-config.json:
```
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "versionRegistryAddress": "0x7380D97dedf9B8EEe5bbE41422645aA19Cd4C8B3",
  "ownerAddress": "<owner_address>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "maxGasPrice": 600e9,
  "ethereumNodeUrl": "https://dai.poa.network"
}
```
