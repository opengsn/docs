### Network Görli

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0x7DDa9Bf2C0602a96c06FA5996F715C7Acfb8E7b0](https://goerli.etherscan.io/address/0x7DDa9Bf2C0602a96c06FA5996F715C7Acfb8E7b0)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://goerli.etherscan.io/address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x7e4123407707516bD7a3aFa4E3ebCeacfcbBb107](https://goerli.etherscan.io/address/0x7e4123407707516bD7a3aFa4E3ebCeacfcbBb107)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x7DDa9Bf2C0602a96c06FA5996F715C7Acfb8E7b0",
  "managerStakeTokenAddress": "0xE8172A9bf53001d2796825AeC32B68e21FDBb869",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0xE8172A9bf53001d2796825AeC32B68e21FDBb869](https://goerli.etherscan.io/address/0xE8172A9bf53001d2796825AeC32B68e21FDBb869) |


#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x7e4123407707516bD7a3aFa4E3ebCeacfcbBb107"
  }})
  await gsnProvider.init()
```

