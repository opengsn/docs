# Getting Started


## See yourself <a id="see_yourself"></a>

One working example is worth a thousand tutorials. Head to the [MetaCoin](https://github.com/opengsn/metacoin) repo, check out the code and explore!

```bash
git clone git@github.com:opengsn/metacoin.git
cd metacoin
npm install
# start local ganache instance
npx ganache-cli -d -k 'istanbul' -l 1e8 &

# start local GSN instance
npx gsn start

# deploy MetaCoin contract and start local web server
npx truffle migrate && npm run dev
```

If you want more control over the local GSN instance, instead of `gsn start` you can run the following commands:
```bash
# deploy GSN contracts (RelayHub, StakeManager, Penalizer and TestPaymaster)
npx gsn deploy

# deposit ether for TestPaymaster contract to RelayHub
npx gsn paymaster-fund

# start local relay server process
npx gsn relayer-run --workdir <workdir> --relayHubAddress <hub_address> --port <port> --url http://127.0.0.1:<port> --ethereumNodeUrl http://localhost:8545 --devMode &

# stake ether for the relay server process and send some ether to fund its operation
npx gsn relayer-register --relayUrl http://localhost:7777

```


## Creating a Provider <a id="creating_a_provider"></a>

Before a transaction can be sent, you will need to create a `RelayProvider`:

```javascript
const { RelayProvider, resolveConfigurationGSN } = require('@opengsn/gsn')

const configuration = await resolveConfigurationGSN(web3.currentProvider, { paymasterAddress })
const provider = new RelayProvider(web3.currentProvider, configuration);
const web3 = new Web3(provider);
```

See [advanced](advanced.md) section for all available configuration parameters. +
See [Paying for your user's meta-transaction](../contracts/index.md#paymaster) to learn where `paymasterAddress` comes from.


## Sending Transactions <a id="sending_transactions"></a>

Once you have connected your web3 instance to a `RelayProvider`, all transactions sent to contracts will be automatically routed through GSN:

```javascript
const myRecipient = new web3.eth.Contract(abi, address);

// Sends the transaction via the GSN
await myRecipient.methods.myFunction().send({ from });

// Disable GSN for a specific transaction
await myRecipient.methods.myFunction().send({ from, useGSN: false });
```


