## Network mumbai

RelayHub: [0xcd68Fae7e604956176bc0CDBd945149c5005794E](https://mumbai.etherscan.io/address/0xcd68Fae7e604956176bc0CDBd945149c5005794E)

Forwarder: [0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc](https://mumbai.etherscan.io/address/0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc)

WrappedEthToken: [0xBA03B53D826207c39453653f655d147d4BCBA7B4](https://mumbai.etherscan.io/address/0xBA03B53D826207c39453653f655d147d4BCBA7B4)

Accept-Everything Paymaster: [0x7Da86B0A86578d1dF10EbebBf4EEBA874b7aE3C5](https://mumbai.etherscan.io/address/0x7Da86B0A86578d1dF10EbebBf4EEBA874b7aE3C5)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "baseRelayFee": 0,
  "pctRelayFee": 70,
  "relayHubAddress": "0xcd68Fae7e604956176bc0CDBd945149c5005794E",
  "token": "0xBA03B53D826207c39453653f655d147d4BCBA7B4",
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
    paymasterAddress: "0x7Da86B0A86578d1dF10EbebBf4EEBA874b7aE3C5"
  }})
  await gsnProvider.init()
```
