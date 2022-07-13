### Network goerli

RelayHub: [0x40bE32219F0F106067ba95145e8F2b3e7930b201](https://goerli.etherscan.io/address/0x40bE32219F0F106067ba95145e8F2b3e7930b201)

Forwarder: [0x7A95fA73250dc53556d264522150A940d4C50238](https://goerli.etherscan.io/address/0x7A95fA73250dc53556d264522150A940d4C50238)

WrappedEthToken: [0xE8172A9bf53001d2796825AeC32B68e21FDBb869](https://goerli.etherscan.io/address/0xE8172A9bf53001d2796825AeC32B68e21FDBb869)

Accept-Everything Paymaster: [0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70](https://goerli.etherscan.io/address/0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x40bE32219F0F106067ba95145e8F2b3e7930b201",
  "managerStakeTokenAddress": "0xE8172A9bf53001d2796825AeC32B68e21FDBb869",
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
    paymasterAddress: "0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70"
  }})
  await gsnProvider.init()
```
