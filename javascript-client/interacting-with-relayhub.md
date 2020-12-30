# Interacting with `RelayHub`

//TIP: If you're unfamiliar with how the GSN works, check out [Sending Gasless Transactions](../learn/sending-gassless-transactions.md) first.

There are many meta-transaction implementations out there, but the GSN has a unique detail that makes it special. At its core, a smart contract is responsible for keeping track of relayers, handling relayed transactions, charging their recipients, and generally ensuring all parties stay honest. This contract is called `RelayHub`, and there is a _single_ instance of it in the whole network (you don't need to deploy your own!). Think of it as a piece of public infrastructure, for all Ethereum users to benefit from.

This document will explain some of `RelayHub` 's tasks, and how they relate to the using of the GSN. See this flow diagram first, and we will try to explain what is going on in this article:

<img src="./images/gsn_flow_full_layered.jpeg" alt="" width="80%" />


## Relay Hub <a id="relay_hub"></a>

One of `RelayHub` 's jobs is to act as a, well, _hub_ for all relayers: they will advertise their services on this contract, and your users will query it to find the relayer that best suits their purposes.

//GSN Provider provides some tools to help in this regard: the [`minStake`](api.md#minstake) and [`minDelay`](api.md#mindelay) [options](api.md#basic-options) can be used to filter out relayers based on their staked amounts and unstake delay. For example, a high-stake relayer might be desirable for critical operations (even if its fee is higher!) to reduce the likelihood of foul play from the relayer.

//Advanced options are also available for relayer selection fine tuning: [`preferredRelayer`](api.md#preferredrelayer) will let you select a default relayer, or you can use either [`relayFilter`](api.md#relayfilter) or [`calculateRelayScore`](api.md#calculaterelayscore) to create your custom relayer selection algorithm.


## Relaying Transactions <a id="relaying_transactions"></a>

The other key task `RelayHub` carries out is the actual _relaying of transactions_, the sole purpose behind this whole system.

Instead of calling a function in your contract directly, your users will request a relayer to do it for them, who will then execute `RelayHub` 's `relayCall` function through the `Forwarder`.
`RelayHub` and `Forwarder` will verify that the transaction is legitimate (protecting both users and recipients from dishonest relayers), and then call into your contract as originally requested by your user.
This does not require your recipient to trust the `RelayHub` to do the right thing, as the user signature check remains in `Forwarder` contract. But since it is a very minimal smart contract, auditing it is as simple as reading its source code!

For the most basic validation checks (like signature verification), a failure will cause relayers to reject a relay request. Some of the checks are dynamic however, and despite the relayed call being reverted, the _actual transaction will not_. This is so that relayers can still be paid for the work they did.

For consistency, GSN Provider will raise exceptions when processing the receipt of such a transaction: these contain data from decoded events and will provide you with relevant information about what went wrong during the relayed call.


## Receiving a Relayed Call <a id="receiving_a_relayed_call"></a>

We've mentioned how the `Forwarder`, and not your user, is the one that actually ends up calling a function in your contract. We will refer to this as the _relayed call_. Your contract needs to be set up to accept relayed calls from the hub. In particular, it needs to be able to answer whether it will pay for a given relayed call, and run some bookeeping to make sure a malicious user cannot abuse it. It also needs to unwrap a relayed call in order to process it.

The [*OpenGSN Contracts*](../contracts/index.md) library includes a number of utilities to make receiving relayed calls as easy as developing a regular Solidity contract, without needing to worry about the low level details.
//It also ships with two built-in [strategies](../contracts/gsn-strategies.md) for managing relayed call subsidies.

//One of these strategies relies on [checking a trusted signature](../contracts/gsn-strategies.md#gsnrecipientsignature) before accepting the relay request: such a signature can be easily generated using GSN Provider by passing the [`approveFunction`](api.md#approvefunction) paramater.


## Payment <a id="payment"></a>

By now you may be wondering how exactly relayers charge their recipients for gas costs and service fees. The answer is simple: each dapp must have a special `Paymaster` contract with funds deposited on `RelayHub` in advance, and payment is automatically handled on each relayed call.

//You can head to the [GSN Recipient Tool](https://gsn.openzeppelin.com/recipients) to check and top-up your contracts' balance, view previous charges, or do all of this programatically using the [*OpenZeppelin GSN Helpers*](../gsn-helpers/index.md).

Paymasters may withdraw their balance from the system at any point, but remember that they will not be able to receive any further relayed calls!


## Learn More <a id="learn_more"></a>

Take a look at the [GSN Frequently Asked Questions](gsn-faq.md) to clarify any doubts about the system you may have.
