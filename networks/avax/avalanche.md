### Network Avalanche

<!-- DO NOT EDIT DIRECTLY THIS MD FILE. IT IS AUTO-GENERATED FROM NET.TEMPL, USING yarn update-networks" -->

RelayHub: [0xD2Cf68e21cc3Afe7F2B36B68A8C5b8FaD1b36CDE](https://snowtrace.io//address/0xD2Cf68e21cc3Afe7F2B36B68A8C5b8FaD1b36CDE)

Forwarder: [0x2e3e3c36a5D01CCf4637cF9624c9d1033e337EA1](https://snowtrace.io//address/0x2e3e3c36a5D01CCf4637cF9624c9d1033e337EA1)

Accept-Everything Paymaster: [0xb0BF015AF20944f3646950DEC3C78603a117c4c0](https://snowtrace.io//address/0xb0BF015AF20944f3646950DEC3C78603a117c4c0)

#### Recommended Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0xD2Cf68e21cc3Afe7F2B36B68A8C5b8FaD1b36CDE",
  "managerStakeTokenAddress": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "ethereumNodeUrl": "<NODE_URL>"
}
```


#### List of supported stake ERC-20 tokens and minimal stakes:

| Token Name  | Value    | Address                                                                                                                       |
|-------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| Wrapped Eth |  0.5 wETH | [0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB](https://snowtrace.io//address/0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB) |


#### Recommended client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0xb0BF015AF20944f3646950DEC3C78603a117c4c0"
  }})
  await gsnProvider.init()
```

