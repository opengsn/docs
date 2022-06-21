# Ethereum Gas Station Network (GSN)

<img src="./images/paymaster_needs_gas.png" alt="" width="100%" />

Ethereum Gas Station Network (GSN) abstracts the process of paying for
gas away from end users which minimizes
UX friction for dapps. With GSN, gasless clients can interact with Ethereum
smart contracts without users needing ETH for transaction fees. The GSN is a
decentralized system that improves dapp usability without sacrificing security.

Example use cases for GSN:

1. **Pay for gas in supported ERC-20 tokens**: Allow users to pay for gas in ERC-20 tokens that support `permit` function
2. **Pay for gas off-chain**: Allow users to pay for gas indirectly via a L2 rollup or a credit card
3. **Privacy**: Enabling ETH-less submission of zero-knowledge proofs, GSN allows sending tokens to stealth addresses
4. **Onboarding**: Allow dapps to subsidize the onboarding process for new users


## The problem <a id="the_problem"></a>

Without GSN, anyone who sends an Ethereum transaction needs to have ETH to pay
for gas fees. This forces new users to pass KYC and purchase ETH before
they can start using any dapp.  This can be a major hurdle for users without
prior crypto experience that are unfamiliar with the concept of needing to keep
ETH in their wallet for gas. 

This is also a UX pain for existing users that need to continually replenish
their ETH balance to pay for gas fees even if they have enough ERC-20 tokens
in their wallet to pay for the transactions they need.


## Architecture <a id="architecture"></a>

<img src="./images/gsn_flow_full_layered.jpg" alt="" width="100%" />

*Components*:

* [**Client**: signs & sends meta transaction to relay server](#client)
* [**Relay servers**: submits a transaction and pays Ethereum protocol gas fees for doing so](#relayservers)
* [**Paymaster**: agrees to refund relay server for gas fees](#paymaster)
* [**Forwarder**: verifies sender signature and nonce](#forwarder)
* [**Recipient contract**: sees the original sender and executes the original transaction](#recipient)
* [**RelayHub**: coordinates the process in a trustless way](#relayhub)

### Client: signs & sends meta transaction to relay server <a id="client"></a>

A meta-transaction is a fancy name for a simple idea: a relay server can send a
user's transaction and pay themselves for the gas cost. Instead of signing an
Ethereum transaction, which would require ETH for gas, a user signs a message
containing information about a transaction they would like to execute and sends
it to a relay server.

### Relay servers: submits a transaction and pays Ethereum protocol gas fees for doing so <a id="relayservers"></a>

Upon receiving the request to relay a transaction from the client, the Relay server
will validate this transaction to make sure it pays back the amount of ETH that
covers the expenses of submitting it and some extra fee to allow the relay to turn a profit.

If everything is fine, the relay signs a native Ethereum transaction, submits
it to the mempool and returns a signed transaction to the client for validation.
In case anything goes wrong, the client can just pick a different relay server
and try to send a transaction via a new one.

This creates a "one for all and all for one" effect where taking down the
frontend of any dapp is as hard as taking down the entire network. The more
dapps participate the more robust the availability guarantee.

### Paymaster: agrees to refund relay server for gas fees <a id="paymaster"></a>

In the GSN all gas refund logic is implemented inside the
Paymaster contracts. A paymaster maintains an ETH balance in the RelayHub and can
implement any business logic to decide whether to accept or reject a meta
transaction. For example, accepting only transactions by whitelisted users, or
to the contracts methods required for onboarding users that also passed a
captcha, or only transactions that include a repayment in tokens to the
Paymaster, etc.

* To learn more about the Paymaster, see [Paying for your user's meta-transaction](/contracts/index.md#paying-for-your-user-s-meta-transaction)

### Forwarder: verifies sender signature and nonce <a id="forwarder"></a>

Meta transaction aware recipient contracts only rely on a small trusted
forwarder contract for their security. This contract verifies the signature and
nonce of the original sender.

* To learn more about the trusted forwarder, see [Trusted Forwarder: Minimum Viable Trust](/contracts/#trusted-forwarder-minimum-viable-trust)

### Recipient contract: sees the original sender and executes the original transaction <a id="recipient"></a>

Any public method of the recipient contract can be executed through GSN.

To support meta transactions recipient contracts inherit from a simple
[base
class](https://github.com/opengsn/gsn/blob/master/packages/contracts/src/ERC2771Recipient.sol) and replace `msg.sender` with `_msgSender()`.
It returns the original sender that signed the meta transaction request.

It is still possible to make a native transaction call to this contract.
The `_msgSender()` method will simply return `msg.sender` if the contract
was called directly.


### RelayHub: coordinates the process in a trustless way <a id="relayhub"></a>

RelayHub connects users running clients, relay servers and paymasters so that
participants don't need to know about or trust each other. 

Dapp developers don't need to understand or trust the inner workings of
RelayHub in order to integrate with the GSN. Recipient contracts are not
exposed to potential security issues in RelayHub.

Under the hood the RelayHub helps clients discover the best third-party relay
server, prevents third-party relay
servers from censoring transactions,
and ensures Paymasters pay back relay servers for
gas fees plus transaction fees.


## Next Steps <a id="next_steps"></a>

To learn more about the GSN, head over to the following resources:

* To learn how to *integrate GSN with your contracts*, see [Writing GSN-capable contracts](/contracts/).
* To learn how to *integrate GSN with your client*, see [Javascript client](/javascript-client/getting-started).
