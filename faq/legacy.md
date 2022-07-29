# What's new for GSNv3

The major changes in GSNv3:

1. Added support for EIP-1559 transactions

Now the GSN allows users and relays to set `maxFeePerGas` and `maxPriorityFeePerGas` allowing them to save on
transaction fees.

2. Added support for L2 rollups and side chains with better Relay Server lookup

Our new Relay Server lookup is based on on-chain storage so that the GSN clients no longer need to rely on
emitted events to find recently registered Relay Servers. This allows the GSN to run smoothly on L2 rollups
and significantly improves lookup speed, client responsiveness and stability under high load on all chains.

3. Added support for L2 rollups and side chains with different calldata cost structure

Now the GSN will have clients estimate and sign the cost of a transaction's calldata separately from the
transaction's execution gas limit. This allows the GSN to support L2 rollups and other networks which have
different fee cost structure for calldata and execution.

4. Avoid asking the client to sign anything for transactions destined to fail

Now the GSN will perform an “unsigned dry-run” view call of the transaction that the user is trying to send
during the initialization stage without asking for the user's signature. In case the transaction reverts in
this view call, there is no need to request the signature as we already know the revert reason.

5. Added support for Relay operators to stake in ERC-20 tokens

Now the GSN will allow Relay Server operators to put stake in select ERC-20 tokens. This will allow using
stablecoins to set a stake size, which will prevent floating exchange rates affecting the security assumptions
of the network.

6. Added a stable transaction ID for GSN meta-transactions

Previously, the transactions sent through the GSN were identified with a regular transaction hash. This created
a problem in case the Relay Server had to modify the gas price of a transaction, which led to change in the transaction
hash and potentially making the relayed transaction invisible to the client. Now transactions will be discoverable
by the clients using an artificial meta-transaction ID.

7. Implemented a fair relayer selection algorithm

Now all relays will have to charge the same fee and the clients by default will pick a random relayer out of the
registered ones. This prevents a situation where all traffic flows through a couple of relayers and hopefully
makes running a relayer a much more interesting task.

8. Better support for Ethers.js Contracts and Signers

The Ethers.js package supports wrapping a Web3.js-style provider like RelayProvider out-of-the-box. This has
allowed the `GSN 2.0` to work with Ethers.js projects but made it inconvenient.
In  `GSN 3.0`  we have added `wrapContract`  and `wrapSigner` functions to the GSN to allow you to connect an
individual Ethers.js contract or signer via GSN. (This feature is experimental).

9. Added support for ERC-165 interface check

Now all smart contracts of the GSN, including Paymasters, implement ERC-165 preventing dapp developers and
Relay Server operators from making mistakes in configuration.

10. Multiple bug fixes and minor improvements
