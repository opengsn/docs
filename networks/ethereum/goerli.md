### Network goerli

RelayHub: [0x79783F052Da5b3366F588C1006a734231ABD777A](https://goerli.etherscan.io/address/0x79783F052Da5b3366F588C1006a734231ABD777A)

Forwarder: [0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc](https://goerli.etherscan.io/address/0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc)

WrappedEthToken: [0xE8172A9bf53001d2796825AeC32B68e21FDBb869](https://goerli.etherscan.io/address/0xE8172A9bf53001d2796825AeC32B68e21FDBb869)

Accept-Everything Paymaster: [0x07C626395cAE3DfDE1a809cfA4aA7e7Ee299C07d](https://goerli.etherscan.io/address/0x07C626395cAE3DfDE1a809cfA4aA7e7Ee299C07d)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0x79783F052Da5b3366F588C1006a734231ABD777A",
  "token": "0xE8172A9bf53001d2796825AeC32B68e21FDBb869",
  "ownerAddress": "<OWNER_ADDRESS>",
  "gasPriceFactor": 1,
  "confirmationsNeeded": 1,
  "registrationBlockRate": 500000,
  "ethereumNodeUrl": "<NODE_URL>>"
}
```

#### Recommeneded client configuration
(Note that on non-testnet networks, you'll need a "real" paymaster)
```js
  const gsnProvider = RelayProvider.newProvider({provider: web3Provider, config: {
    paymasterAddress: "0x07C626395cAE3DfDE1a809cfA4aA7e7Ee299C07d"
  }})
  await gsnProvider.init()
```

