# Ethereum Gas Station Network (GSN)

<img src="./images/paymaster_needs_gas.png" alt="" width="100%" />

Ethereum Gas Station Network (GSN) abstracts away gas to minimize onboarding &
UX friction for dapps. With GSN, gasless clients can interact with Ethereum
contracts without users needing ETH for transaction fees. The GSN is a
decentralized system that improves dapp usability without sacrificing security.

Example use cases for GSN:

1. **Pay gas in any token**: Allow users to pay for gas in any token
2. **Pay gas in fiat**: Allow users to pay for gas in fiat without having to go through KYC
3. **Privacy**: Enabling ETH-less withdrawal of tokens sent to stealth addresses
4. **Onboarding**: Allow dapps to subsidize the onboarding process for new users


## The problem <a id="the_problem"></a>

Without GSN, anyone who sends an Ethereum transaction needs to have ETH to pay
for gas fees. This forces new users to pass KYC and purchase ETH before
they can start using any dapp.  This can be a major hurdle for users without
prior crypto experience that are unfamiliar with the concept of needing to keep
ETH in their wallet for gas. 

This is also a UX pain for existing users that need to continually replenish
their ETH balance to pay for gas fees even if they have tokens worth thousands
of dollars in their wallet.


## Architecture <a id="architecture"></a>

<img src="./images/gsn_flow_full_layered.jpg" alt="" width="100%" />

*Components*:

* [**Client**: signs & sends meta transaction to relay server](#client)
* [**Relay servers**: one for all and all for one](#relayservers)
* [**Paymaster**: agrees to refund relay server for gas fees](#paymaster)
* [**Trusted Forwarder**: verifies sender signature and nonce](#forwarder)
* [**Recipient contract**: sees original sender](#recipient)
* [**RelayHub**: connecting participants trustlessly](#relayhub)

### Client: signs & sends meta transaction to relay server <a id="client"></a>

A meta-transaction is a fancy name for a simple idea: a relay server can send a
user's transaction and pay themselves for the gas cost. Instead of signing an
Ethereum transaction, which would require ETH for gas, a user signs a message
containing information about a transaction they would like to execute and sends
it to a relay server. Before the relay server pays for gas it verifies it will
get refunded by a Paymaster contract.

### Relay servers: one for all, all for one <a id="relayservers"></a>

The best practice is for every dapp to deploy their own relay servers that will
provide service at-cost to its own users and charge a transaction fee for
serving the users of other dapps.

If the dapp's relay servers are unavailable (e.g., DoS attack) the client will
fallback to routing transactions through the relay servers of other dapps that
are willing to serve it in exchange for an extra fee.

This creates a "one for all and all for one" effect where taking down the
frontend of any dapp is as hard as taking down the entire network. The more
dapps participate the more robust the availability guarantee.

### Paymaster: agrees to refund relay server for gas fees <a id="paymaster"></a>

In the GSN, all access control and gas refund logic is implemented inside
Paymaster contracts. A paymaster has a gas tank of ETH in the RelayHub and can
implement any business logic to decide whether to accept or reject a meta
transaction. For example, accepting only transactions by whitelisted users, or
to the contracts methods required for onboarding users that also passed a
captcha, or only transactions that include a repayment in tokens to the
Paymaster, etc.

* To learn more about the Paymaster, see [Paying for your user's meta-transaction](../contracts/index.md#paymaster)
### Trusted Forwarder: verifies sender signature and nonce <a id="forwarder"></a>

Meta transaction aware recipient contracts only rely on a small trusted
forwarder contract for their security. This contract verifies the signature and
nonce of the original sender.

* To learn more about the trusted forwarder, see [Trusted Forwarder: Minimum Viable Trust](https://docs.opengsn.org/contracts/index.html#trusted_forwarder)
### Recipient contract: sees original sender <a id="recipient"></a>

To support meta transactions recipient contracts inherit from a simple
[base
class](https://github.com/opengsn/gsn/blob/master/contracts/BaseRelayRecipient.sol) and replace `msg.sender` with `_msgSender()`. It returns the the original
sender that signed the meta transaction request, or msg.sender if the contract
was called directly.
### RelayHub: connecting participants trustlessly <a id="relayhub"></a>

RelayHub connects users running clients, relay servers and paymasters so that
participants don't need to know about or trust each other. 

Dapp developers don't need to understand or trust the inner workings of
RelayHub in order to integrate with the GSN. Recipient contracts are not
exposed to potential security issues in RelayHub.

Under the hood the RelayHub helps clients discover the best third-party relay
server when the dapp's relay servers are down, prevents third-party relay
servers from censoring transactions, rebalances the ETH of relay servers
serving their own Paymasters, and ensures Paymasters pay back relay servers for
gas fees plus transaction fees.


* To learn more about the RelayHub, see [Interacting With `RelayHub`](../javascript-client/interacting-with-relayhub.md).


## Next Steps <a id="next_steps"></a>

To learn more about the GSN, head over to the following resources:

* To learn how to *integrate GSN with your contracts*, see [Writing GSN-capable contracts](../contracts/index.md).
* To learn how to *integrate GSN with your client*, see [Javascript client](../javascript-client/getting-started.md).
