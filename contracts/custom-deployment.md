# Deploying custom GSN instance

## You probably do not need to do it

The idea behind the GSN project is to create a single network of Relay Servers serving a pool of dapps together.

The on-chain part of the GSN contains of the following contracts:
`Forwarder`, `RelayHub`, `RelayRegistrar`, `StakeManager`, `Penalizer`.

The GSN team has deployed the core GSN contracts on [the most used networks](../networks/addresses) and will add more networks in the future.

You can also consider using any of the existing centralized
[ERC-2771 Meta-Transactions](https://eips.ethereum.org/EIPS/eip-2771)
services, as well as using a `Paymaster`-sponsored `UserOperations` defined in
[ERC-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337).

However, it is possible neither solution works for your use case.
For example, there may be no existing third-party meta-transaction or account abstraction servers
available for your target chain.

In this case you can bring up your own GSN network instance.

## Deployment Script

The GSN contracts are deployed using a [`Hardhat Deploy`](https://github.com/wighawag/hardhat-deploy) plugin.
The script used to deploy GSN contracts is publicly available here:\
https://github.com/opengsn/gsn/blob/master/packages/deployer/deploy/deploy.ts

## Deployment configuration

The `deploy.ts` script will read the deployment configuration file located at `./packages/deployer/deployments/deployment-config.ts`.

Example contents for the `deployment-config.ts` file that was used to deploy GSN `3.0.0-beta.3` on Ethereum Mainnet:

```deployment-config.ts
module.exports = {
  1: {
    environmentsKey: 'ethereumMainnet',
    relayHubConfiguration: {
      devAddress: '0x8C1FD2DE219c98f5F88620422e36a8A32f83324E',
      devFee: 10,
      pctRelayFee: 30,
      baseRelayFee: 0
    },
    // deploymentConfiguration is the only entry not read from the "environments"
    deploymentConfiguration: {
      registrationMaxAge: 15552000,
      paymasterDeposit: '0',
      isArbitrum: false,
      deployTestPaymaster: false,
      minimumStakePerToken: {
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': '0.01'
      }
    },
    stakeBurnAddress: '0x8C1FD2DE219c98f5F88620422e36a8A32f83324E'
  }
}
```

You need to provide a suitable configuration and execute the `yarn deploy` command. 
