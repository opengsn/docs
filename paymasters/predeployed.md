# Using pre-deployed GSN Paymasters

The idea behind Paymasters in the GSN architecture is to allow dapp developers to
implement arbitrary gas payment logic that suits their smart contracts logic and overall use-case.

However, some use-cases do not require a dedicated Paymaster and can reuse the same logic.

Going forward, we will adopt such Paymasters into the core GSN repo, deploy them on the supported chains,
provide client-side code and documentation. Their addresses will be available on this site and
published with the GSN client library NPM package.

You can initialize the RelayProvider to use one of these Paymasters by passing a `PaymasterType` enum
instead of address as the `paymasterAddress` config parameter.

:warning: Notice that these Paymaster were not audited yet and using these are at your own risk.

Here is the list of Paymasters that are currently supported:

## SingletonWhitelistPaymaster

This Paymaster allows the dapp owners to maintain a simple set of rules on-chain for their GSN integrations.
Supports enabling specified target contracts (Recipients), senders and methods (per target) to be subsidized.
Unlike 'VerifyingPaymaster' doesn't require any server-side code but also does not provide any additional protection.

In order to link the RelayProvider to the "dapp owner" (the address that deposits funds into the Paymaster for the
specific target configuration) you must set `dappOwner` value in the `GSNConfig`.

Usage:
``` typescript
import { PaymasterType } from '@opengsn/common'
import { RelayProvider, GSNConfig } from '@opengsn/provider'

const gsnConfig: Partial<GSNConfig> = {
    loggerConfiguration: { logLevel: 'debug' },
    paymasterAddress: PaymasterType.SingletonWhitelistPaymaster,
    dappOwner: "0x... <your 'dapp owner' address>"
}

const gsnProvider = RelayProvider.newProvider({ 
    provider: window.ethereum,
    config: gsnConfig 
})
```

## PermitERC20UniswapV3Paymaster

An experimental Paymaster contract that uses ERC-20 tokens with meta-transaction support via a `permit()` function to pay for gas.


The Paymaster maintains a positive cash-flow by converting the tokens on Uniswap v3. Currently only deployed on Goerli network.

Note: currently, this Paymaster requires a custom provider.

Usage:
``` typescript
import { GSNConfig } from '@opengsn/provider'
import { PaymasterType } from '@opengsn/common'
import { TokenPaymasterProvider } from '@opengsn/paymasters'

const gsnConfig: Partial<GSNConfig> = {
    loggerConfiguration: { logLevel: 'debug' },
    paymasterAddress: PaymasterType.PermitERC20UniswapV3Paymaster
}

const gsnProvider = TokenPaymasterProvider.newProvider({
    provider: window.ethereum,
    config: gsnConfig
})

await gsnProvider.init(DAI_TOKEN_ADDRESS)
```

Note that passing the token address parameter to the `init()` function is optional and the `TokenPaymasterProvider`
will attempt to automatically select a token with the highest balance for the currently connected account from the
list of tokens supported on current chain in case this value is not provided.
