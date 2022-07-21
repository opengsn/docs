### Network Optimism Kovan

RelayHub: [0x5Aa3c9e8a62C35E656C1CC601aa91107800278FC](https://kovan-optimistic.etherscan.io/address/0x5Aa3c9e8a62C35E656C1CC601aa91107800278FC)

Forwarder: [0x7A95fA73250dc53556d264522150A940d4C50238](https://kovan-optimistic.etherscan.io/address/0x7A95fA73250dc53556d264522150A940d4C50238)

WrappedEthToken: [0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d](https://kovan-optimistic.etherscan.io/address/0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d)

Accept-Everything Paymaster: [0x624171537211A95E9C5d9C58E04668328a6a95cE](https://kovan-optimistic.etherscan.io/address/0x624171537211A95E9C5d9C58E04668328a6a95cE)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x5Aa3c9e8a62C35E656C1CC601aa91107800278FC",
  "managerStakeTokenAddress": "0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```

#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x624171537211A95E9C5d9C58E04668328a6a95cE"
  }})
  await gsnProvider.init()
```

