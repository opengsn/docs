### Network Optimism

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0xbF06d99FDE1dc4e4C24F4191Fad82F8f5524Ce62](https://optimistic.etherscan.io//address/0xbF06d99FDE1dc4e4C24F4191Fad82F8f5524Ce62)

Forwarder: [0xB2b5841DBeF766d4b521221732F9B618fCf34A87](https://optimistic.etherscan.io//address/0xB2b5841DBeF766d4b521221732F9B618fCf34A87)

Accept-Everything Paymaster: [0x6E4f6878d1188d281F79a8d06e1f52A5cF80b792](https://optimistic.etherscan.io//address/0x6E4f6878d1188d281F79a8d06e1f52A5cF80b792)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xbF06d99FDE1dc4e4C24F4191Fad82F8f5524Ce62",
  "managerStakeTokenAddress": "0x4200000000000000000000000000000000000006",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0x4200000000000000000000000000000000000006](https://optimistic.etherscan.io//address/0x4200000000000000000000000000000000000006) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x6E4f6878d1188d281F79a8d06e1f52A5cF80b792"
  }})
  await gsnProvider.init()
```

