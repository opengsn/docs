# GSN Helpers

In order to help developers interact with the network, both locally and on real networks, the GNS library includes a set of command-line tools.


## CLI commands <a id="cli_commands"></a>

The `gsn` tool provides the following commands:


### start
Both [runs](../deploy[deploys] GSN contracts and xref/index.md#run) a local Relay process.
```bash
npx gsn start [--workdir <directory>]
```
### deploy <a id="deploy"></a>
Deploy the singleton RelayHub instance, as well as other required GSN contracts (StakeManager, Penalizer, TestPaymaster). Saves the deployment results to the <workdir> directory.

```bash
npx gsn deploy [--from <account>] [--workdir <directory>] [--network <url>]
```

|===
|Parameter|Default value|Description
|from|first account with balance|account to send transactions from
|workdir|build/gsn|relative work directory
|network|'http://localhost:8545'|url to the local Ethereum node'
|===
### relayer-run <a id="run"></a>
Starts a process of a Relay Server

|===
|Parameter|Default value|Description
|BaseFee||Base fee (in wei) to charge on every transaction
|PercentFee||% of gas used by a relayed tx to charge as fee
|Url||Public URL to advertise on RelayHub
|RelayHubAddress||Address of RelayHub
|GasPricePercent||Change gas price compared to network average by this %
|EthereumNodeUrl|| URL of the Ethereum node to connect
|Workdir||Directory to store relay data in
|===



### relayer-register
Fund and register the relay server

```bash
npx gsn relayer-register [--from <account>]  [--relayUrl <url>] [--hub <address>] [--stake <stake>] [--unstakeDelay <delay>] [--funds <funds>] [--network <url>]
```

|===
|Parameter|Default value|Description
|relayUrl|http://localhost:8090|url to advertise the relayer
|hub|address from build/gsn/RelayHub.json if exists|address of the RelayHub contract
|stake|1 Ether|amount to stake for the relayer, in wei
|unstakeDelay|one week|time to wait between deregistering and withdrawing the stake, in seconds
|funds|5 Ether|amount to transfer to the relayer to pay for relayed transactions, in wei
|===


### paymaster-fund

Fund a paymaster contract so that it can receive relayed calls.

```bash
npx gsn paymaster-fund [--from <account>] [--hub <address>]  [--paymaster <address>] [--amount <amount>] [--network <url>]
```

|===
|Parameter|Default value|Description
|paymaster|address from build/gsn/Paymaster.json if exists|address of the paymaster contract
|amount|1 Ether|amount of funds to deposit for the paymaster contract, in wei
|===


### paymaster-balance

Query a paymaster or relayer owner GSN balance.

```bash
npx gsn paymaster-balance [--hub <address>]  [--paymaster <address>] [--network <url>]
```
