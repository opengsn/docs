# Command-Line tools

In order to help developers interact with the network, both locally and on real networks, the GSN library includes a set of command-line tools.

### Installing CLI

The CLI commands are in a package `@opengsn/cli`, so you must install it separately:
```
yarn add --save-dev @opengsn/cli
```

### start <a id="start"></a>

Run GSN on a local test network.
These commands deploy GSN contracts, and then starts a relay server

```bash
npx gsn start [--workdir <directory>] [-n <network>]
```

The `<network>` defaults to "http://localhost:8545".

Contract addresses are written into `<directory>`, which is `./build/gsn` by default.
From a test script, use
```js
const { GsnTestEnvironment } = require( '@opengsn/dev')
const { paymasterAddress, forwarderAddress } = GsnTestEnvironment.loadDeployments()
```

To load the deployed addresses into a test application.

::: tip Note
GSN is already deployed on most [public test and mainnet networks](/networks.md), so you don't need to deploy it there
:::

### deploy <a id="deploy"></a>

Deploy the singleton RelayHub instance, as well as other required GSN contracts (StakeManager, Penalizer, TestPaymaster). Saves the deployment results to the &lt;workdir> directory.

```bash
npx gsn deploy [--from <account>] [--workdir <directory>] [--network <url>]
```

|Parameter|Default value|Description|
|---|---|---|
|from|first account with balance|account to send transactions from
|workdir|build/gsn|where to write json files with addresses
|network|'http://localhost:8545'|url to the local Ethereum node

### relayer-register <a id="register"></a>
Fund and register the relay server.

You need to run it after you start your own relayer on a public network

```bash
npx gsn relayer-register [--from <account>]  [--relayUrl <url>] [--stake <stake>] [--unstakeDelay <delay>] [--funds <funds>] [--network <url>] [ --gasPrice <gasPrice>] [--mnemonic <mnemonic-file>] [--token <tokenAddress>] [--wrap]
```


|Parameter|Default value|Description
|---|---|---|
|relayUrl|http://localhost:8090|relayer to register.
|stake|1 Ether|amount to stake for the relayer
|unstakeDelay|1000|time to wait between deregistering and withdrawing the stake, in blocks
|funds|2 Ether|amount to transfer to the relayer to pay for relayed transactions
|network|localhost|network to connect to (name or rpc url)
|gasPrice|1 gwei|gas price for registration transactions
|mnemonic||Mnemonic file for the relayer "owner" account (with ether)
|token||Token to use for staking. defaults to first registered token (usually "wrapped eth" token)
|wrap||If the owner doesn't own enough tokens, then assume the token is a "wrapped eth" and call `deposit()` on it to convert eth into tokens. 


### paymaster-fund

Fund a paymaster contract so that it can receive relayed calls.

```bash
npx gsn paymaster-fund [--from <account>] [--hub <address>]  [--paymaster <address>] [--amount <amount>] [--network <url>] [ --gasPrice <gasPrice>] [--mnemonic <mnemonic-file>]
```

|Parameter|Default value|Description
|---|---|---|
|paymaster|address from build/gsn/Paymaster.json if exists|address of the paymaster contract
|amount|1 Ether|amount of funds to deposit for the paymaster contract, in wei
|network|localhost|network to connect to (name or rpc url)
|gasPrice|1 gwei|gas price for registration transactions
|mnemonic||Mnemonic file for the relayer "owner" account (with ether)


### paymaster-balance

Query a paymaster or relayer owner GSN balance.

```bash
npx gsn paymaster-balance [--hub <address>]  [--paymaster <address>] [--network <url>]
```
