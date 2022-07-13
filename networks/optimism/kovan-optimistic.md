### Network Optimistic-Kovan

RelayHub: [0x73F81F562885D2631A4C5f4C84f294aeD467c34B](https://kovan-optimistic.etherscan.io/address/0x73F81F562885D2631A4C5f4C84f294aeD467c34B)

Forwarder: [0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc](https://kovan-optimistic.etherscan.io/address/0xF4074e1df418Bc25D26fFb24aEDb893F9cd085fc)

WrappedEthToken: [0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d](https://kovan-optimistic.etherscan.io/address/0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d)

Accept-Everything Paymaster: [0x237085d39405e0f1A57D4f69F2Be98519b410D66](https://kovan-optimistic.etherscan.io/address/0x237085d39405e0f1A57D4f69F2Be98519b410D66)

#### Recommeneded Server configuration
gsn-relay-config.json:
```json
{
  "relayHubAddress": "0x73F81F562885D2631A4C5f4C84f294aeD467c34B",
  "token": "0x0b9D225C6A347eC2D12F664b85CB11B735BFc86d",
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
    paymasterAddress: "0x237085d39405e0f1A57D4f69F2Be98519b410D66"
  }})
  await gsnProvider.init()
```
