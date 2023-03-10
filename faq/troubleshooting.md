# Troubleshooting


## What is the relationship between the GSN and ERC-4337 projects?

We believe that the GSN has by now successfully solved the meta-transactions and gas abstraction problems in the Ethereum ecosystem, taking it from hackathon ideas to a public infrastructure project with many years of production experience and track record.

Our team has applied this experience to solve some of the most challenging problems in Ethereum, including but not limited to Account Abstraction, Gas Abstraction, Signature Aggregation, Transaction Batching, Transaction Scheduling and MEV Adoption.
All this work is coming together under the ERC-4337 (https://eips.ethereum.org/EIPS/eip-4337). You can read the documentation (https://eip4337.com/en/latest/), read some blog posts here(https://hackmd.io/@erc4337/) or see the code for yourself (https://github.com/eth-infinitism/account-abstraction/).


It is important to note that the GSN library is intended for dapp developers who want to sponsor transactions for existing Ethereum users here and now.
It works with existing wallets like MetaMask and existing Externally Owned Accounts (EOAs) and allows them to make gasless decentralized meta-transactions.

ERC-4337, on the other hand, cannot support existing accounts. It's intended for "Smart Wallets" developers who will create new accounts for their users. ERC-4337 will require users to install ERC-4337 compatible wallets and use compatible dapps to take advantage of gasless features via the ERC-4337 Paymaster contracts.

ERC-4337 will supersede GSN once Ethereum deprecates EOAs completely, which is not currently on the horizon.

## I am getting the following exception: `error:0308010C:digital envelope routines::unsupported code:ERR_OSSL_EVP_UNSUPPORTED`
This can be resolved with `export NODE_OPTIONS=--openssl-legacy-provider`.

## My contract is using OpenZeppelin. How do I add GSN support?

Here is a sample on how to use GSN with OpenZeppelin contracts.
The `_msgData` and `_msgSender` methods methods of OpenZeppelin's `Context` base-contract
are used by all other contracts, and thus the hooks below are enough to support tokens, Ownable, roles, etc.

(Note that OpenZeppelin's `GSNRecipient` is for GSN v1.0, and should not be used anymore)

```solidity
pragma solidity ^0.8;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyContract is ERC2771Recipient, ERC20 {

  constructor(string memory name_, string memory symbol_, address forwarder_) 
    ERC20(name_, symbol_) {
    _setTrustedForwarder(forwarder_);
  }

  string public override versionRecipient = "2.2.0";

  function _msgSender() internal view override(Context, ERC2771Recipient)
      returns (address sender) {
      sender = ERC2771Recipient._msgSender();
  }

  function _msgData() internal view override(Context, ERC2771Recipient)
      returns (bytes calldata) {
      return ERC2771Recipient._msgData();
  }
}
```

You can use instead OpenZeppelin's `ERC2771Context`, which is an equivalent implementation of ERC2771Recipient.

## "signature mismatch" when using Metamask with local ganache


This is an old [bug](https://github.com/trufflesuite/ganache-core/issues/515) in Ganache.
It was fixed in v6.11, but requires an extra command-line argument:
```bash
ganache-cli --chainId 1337
```

Next major release should work without it.

(if you're curious: ganache's RPC call reports that the chain-id is 1337, but the OPCODE `chainid` returns 1 - unless we explicitly add the above command-line argument)

## Error: Provided Hub version(2.0) is not supported by the current interactor(2.2.2)

The **Paymaster** version is wrong: The client checks that it is compatible with all the contracts.
This happens when you create a custom paymaster with a version string that is less than 2.2.0


## I get an error: paymaster rejected in local view call to 'relayCall()' : Forwarder is not trusted

The paymaster doesn't support the forwarder that is used by your target contract.
make sure to set the `trustedForwarder` on both the paymaster an recipient contract, and use the same forwarder.


## I have multiple tests, each run ok, but running them together, I get "Unacceptable relayMaxNonce"

There is an issue with the way a relayer currently work and Truffle's `contract()` test construct.
Please use `describe()` or `context` instead (and avoid to snapshot/revert while a relayer is running)

An alternative is to start relayer in the `begin()` block of the contact.
Just note that you need to recreate the provider, and update the forwarder for your contracts.
e.g:

```js
contract('mytest', ()=> {
  before(async()=> {
    await GsnTestEnvironment.startGsn('localhost')
    const { forwaderAddress, paymasterAddress } = GsnTestEnvironment.loadDeployment()
    provider = RelayProvider.newProvider({provider: web3.currentProvider, config: { paymasterAddress}})
  })

  after(async()=> {
    await GsnTestEnvironment.stopGsn()
  })
}

```
  
}



## My client fails with an error: Can't resolve 'fs' 

Depending on your UI framework, you need to configure your webpack:

### Gatsby

Add this configuration file `gatsby-node.js` in the root of your project:
```js
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
        node: {
          fs: 'empty'
        }
  })
}
```

### Next.JS

Add the following configuration to `next.config.js` at the root directory of the project:

```js
module.exports = {
  future: { webpack5: true }, //needed only by earlier next.js versions (<= 10)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
}
```
