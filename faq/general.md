# The Big Picture

## Should dapp developers run their own relay server? <a id="do_i_have_to_run_a_relayer?"></a>

Running a relay server is highly recommended for most use cases. It will
usually save money for dapps to run their own relays and configure them as the
"preferred relay" for their clients. This way they can avoid having to pay an
extra transaction fee to a third party. 

Only in case the dapp's preferred relay server is unavailable, the clients will
seamlessly fallback to another relayer in the network. This protects against
network failures and denial of service attacks.

If a preferred relay is not configured, all transactions will be routed through
third party relay servers for an extra fee.

## Who pays for gas? <a id="who_is_paying_the_gas?"></a>

Ethereum always require gas as payment for transactions, but when using GSN,
who pays for the gas is abstracted away and replaced with arbitrary
programmable logic.

Every transaction going through GSN must specify the address of a specific
paymaster contract.  This contract is programmed to decide under which
conditions it is willing to accept a transaction and refund relay servers for
gas on its behalf.

A paymaster can implement arbitrary acceptance policies. For example, one type
of paymaster could be programmed to allow users to pay for gas in any token
that can be exchanged for ETH.  Another example would be a paymaster that
accepts transactions on behalf of paying dapp subscribers. 

For the use case of minimizing onboarding friction, dapp developers can roll
gas costs into the cost of user acquisition by deploying a paymaster contract
that subsidizes gas for transactions that invoke contract methods required to
onboard new users.

More advanced use cases include ETH-less withdrawals of token deposits to
stealth addresses and zk mixers, and even counterfactual smart wallet contracts
paying for their own deployment in fiat or a stablecoin.

The sky is the limit. 

## Do dapps have to pay for their user's gas?</a>

No, though that is an option. Dapp development can choose from basic predefined
payment strategies or construct their own. The `Paymaster` contract provides
for pre and post-payment hooks that can be used to verify that a contract
function and user are eligible for the transaction cost to be covered by a
relay server as well as allow users to pay relays in tokens rather than ETH.

When deciding how many payments and for how much to cover, dapp developers
should consider what they expect the total cost of payment to be, and how they
will identify who are their users. It is up to dapp developers to decide how
they will identify who is an eligible user.

## Can I use this with credit cards? <a id="can_i_use_this_with_credit_cards?"></a>

An interesting use case for GSN is allowing users to pay for transactions via
credit cards. An example way this might work would be charging a user directly
for tokens that are then used to access services via a dapp. The tokens can be
held in a contract representing a users balance, and when making a transaction
using the GSN their token balance can be decremented to cover the 'cost' of
each transaction.

## Where is the private key? <a id="where_is_the_private_key?"></a>

While relay servers pay the gas cost for transactions, this does not mean they
have access to user's private keys.  The user's client uses its wallet private
key to sign the request it sends the relayer. User private keys are never
shared or exposed to any entity, neither relay servers nor on-chain contracts.

## How secure is GSN? <a id="is_gsn_secure?"></a>

The GSN network and smart contracts have been audited and are considered to be safe.

The [GSN Protocol](https://github.com/opengsn/gsn-protocol/blob/master/gsn-protocol.md) lists several theoretical attacks against the relay network and paymasters which have been accounted for by the software implementation.

## How does a contract know who the user is? <a id="how_do_i_know_who_the_user_is?"></a>

The `BaseRelayRecipient` contract has a utility function called `_msgSender()`
which returns the true address of the user making a contract call. The function
`_msgSender()` should be used in place of the solidity system variable
`msg.sender`.

The GSN network is built to be compatible with the Ethereum network in its
present state. This means that for relayed transactions, `msg.sender` will
return the address of the relay server signing the transaction, and not the
user requesting the transaction. Contracts that use `msg.sender` are not
natively compatible with the Gas Station network. It is necessary to use the
`_msgSender()` function from the `BaseRelayRecipient` contract in the [*OpenGSN
library*](../contracts/index.md) if your contract needs to identify the
initiator of a GSN powered transaction.

## Why are ETH deposits in RelayHub required?<a id="why_do_i_have_to_deposit_eth_in_the_relayhub?"></a>

Like the underlying blockchain it supports, the GSN is a trust-minimized
decentralized system that does not require participants to know or trust each
other. Instead their interactions are mediated by RelayHub, an audited on-chain
contract.

To deter abuse, relay servers must stake in the `RelayHub` while `Paymasters`
deposit a balance. That way relay servers don't have to trust the paymaster
contracts they serve and vice versa.

The balance deposited by `Paymasters` is used to refund relayers for the cost
of relaying transactions plus an extra incentivization fee.

Relay providers are required to put a stake into the `RelayHub` to ensure good
behavior. In the event a relayer behaves badly (for example attempting to reuse
a nonce) their stake can be slashed and collected by other relayers by proving
on-chain the relayers bad behavior. This system of checks and balances is one
of the features that keep the GSN safe and ensures that some forms of attacks
against the network do not scale.

## Does my Paymaster contract need to hold ETH directly? <a id="does_my_app_need_to_hold_money?"></a>

No. The funds which are used by a Paymaster contract to pay for a user's gas
costs are stored in the audited `RelayHub` contract. This contract is already
deployed on [every network (testnet, mainnet, etc..)](/networks) and does not
need to be managed by dapp developers.

Paymaster owners need to ensure that the balance stored on RelayHub is
sufficient to cover the cost of transactions. If there is not a sufficient
balance to cover the cost of relaying transactions, no transactions will be
processed until the balance is increased.

## Does GSN work with other web3 providers? <a id="does_it_work_with_other_web3_providers?"></a>

GSN can work with any rpc provider - either injected (e.g. metamask) or
web-based libraries (like Portis)
