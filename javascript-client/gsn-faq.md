# GSN Frequently Asked Questions


## What does GSN stand for? <a id="what_does_gsn_stand_for?"></a>

GSN stands for [Gas Station Network](https://gsn.ethereum.org). The GSN project has grown to encompass many companies in the Ethereum space looking to work together to solve the problem of onboarding users to Ethereum applications.


## How does it work? <a id="how_does_it_work?"></a>

The Gas Station Network is a decentralized network of relayers which can be used to sign and send Ethereum transactions without the original sender (the end-users) paying for gas.

Users sign messages (not transactions) containing information about a transaction they would like and arguments they would like to pass. The relayers are then responsible for signing valid Ethereum transactions with this information, and an inherited [`BaseRelayRecipient`](../contracts/index.md#recipient) contract preserves the identity of the user that originally requested the transaction. In this way, users can interact directly with smart contracts without needing to have a wallet or own ETH.


## Who is paying the gas? <a id="who_is_paying_the_gas?"></a>

As GSN is intended primarily to [solve the user onboarding problem](https://blog.openzeppelin.com/gsn-the-ultimate-ethereum-onboarding-solution), it is expected that the (d)app developers themselves will be responsible for paying the gas cost of users. In this case, gas costs should be considered the cost of user acquisition.

Alternatively, the GSN can be used for more specific situations, such as paying for DAO users transactions from a DAO treasury account, or contracts where users pay for their transactions via counterfactually deployed smart contracts.

Normally when interacting with the Ethereum network and smart contracts, it is required that the user pay gas in the form of ETH to compensate the Network for the cost of processing transactions.

When using GSN, the Ethereum network still requires gas as payment to sign transactions, but it is no longer necessary for the user to pay. Instead, a network of relayers pay the gas cost by signing transactions in the name of users and the relayers are then refunded directly by the contract the users wish to interact with.


## Does this work for any contract? <a id="does_this_work_for_any_contract?"></a>

For relayers to pay the gas cost of signing transactions, it is required that the contract with which the user is interacting be GSN enabled. To enable GSN a contract must inherit from the `BaseRelayRecipient` contract in the [*OpenGSN library*](../contracts/index.md).


## Does this work for any transaction? <a id="does_this_work_for_any_transaction?"></a>

No, relayers are only able to pay the gas cost of signing transactions for GSN enabled contracts that conform to the GSN specification. Arbitrary contract calls to non-GSN enabled contracts, or for tasks such as sending ETH or mining ETH are not currently supported.


## Where is the private key? <a id="where_is_the_private_key?"></a>

While relayers pay the gas cost for users, this does not mean they have access to users' private keys. The `BaseRelayRecipient` contract has a utility function called `_msgSender()` which is to be used in place of the solidity system variable `msg.sender` and returns the true address of the user - even when transactions are signed by the relayers private key.

User private keys are never shared or exposed to the relays.


## Is this safe? Secure? <a id="is_this_safe?_secure?"></a>

The GSN network and smart contracts have been audited and are considered to be safe. As the relayers do not have access to users' private keys there is no danger of user funds being stolen via stolen private keys.

The original [Gas Station Network EIP: 1613](http://eips.ethereum.org/EIPS/eip-1613) lists several theoretical attacks against the relay network which have been accounted for by the software implementation and the Relay network should be considered safe.

As always, applications that intend to store large amounts of value should consider carefully their software architecture design to minimize the opportunity for unaccounted for edge cases which could lead to a reduction in security and loss of funds.


## How do I know who the user is? <a id="how_do_i_know_who_the_user_is?"></a>

The `BaseRelayRecipient` contract has a utility function called `_msgSender()` which returns the true address of the user making a contract call. The function `_msgSender()` should be used in place of the solidity system variable `msg.sender`.


## Why does it matter if I know who the user is? <a id="why_does_it_matter_if_i_know_who_the_user_is?"></a>

The GSN network is built to be compatible with the Ethereum network in its present state. This means that for relayed transactions, `msg.sender` will return the address of the relayer signing the transaction, and not the user requesting the transaction. Contracts that use `msg.sender` are not natively compatible with the Gas Station network. It is necessary to inherit the `_msgSender()` function from the `BaseRelayRecipient` contract in the [*OpenGSN library*](../contracts/index.md) if your contract needs to identify the initiator of a GSN powered transaction.


## Do I pay for everyone? How do I decide who to pay for? <a id="do_i_pay_for_everyone?_how_do_i_decide_who_to_pay_for?"></a>

(D)app owners can choose from basic predefined payment strategies or construct their own. The `Paymaster` contract provides for pre and post-payment hooks that can be used to verify that a contract function and user are eligible for the transaction cost to be covered by a Relay as well as allow users to pay relays in tokens rather than ETH.

When deciding how many payments and for how much to cover, (d)app owners should consider what they expect the total cost of payment to be, and how they will identify who are their users. It is up to (d)app owners to decide how they will identify who is an eligible user.


## If users don't need Metamask, where is the private key? <a id="if_users_don't_need_metamask,_where_is_the_private_key?"></a>

To use GSN it is not necessary for users to have ETH or even have a wallet such as Metamask. This makes it ideal for creating universally accessible (d)apps that work equally as well on mobile as on desktop.

With GSN, users' private keys (keypairs) are only used to sign a message for the relayers. For some appications, users may not be storing any significant value on this keypair and thus the security necessary for this key pair can be tuned to match the requirements of the (d)application.

This enables the use-case where the user's keypair can be generated in-browser ephemerally. To persistent such "ephemeral" keypairs (d)apps can store this keypair in local storage, or leverage traditional web2 technologies to present users with a typical web2 login experience.


## Does GSN work with MetaMask? <a id="does_gsn_work_with_metamask?"></a>

Although GSN does not require a wallet provider such as Metamask, it is possible to use a wallet provider in conjunction with GSN for novel use cases. An example would be an application which requires users to register via a normal (non-gsn) Ethereum transaction and then for some time afterward, they would not be required to use Metamask to sign each transaction, rather the transactions would be handled by the GSN relays. This could be very convenient for applications which require a high number of transactions and where a confirmation popup for each transaction would be distracting or give a poor user experience.


## How do I transition users from the browser key to using MetaMask or vice versa? <a id="how_do_i_transition_users_from_the_browser_key_to_using_metamask_or_vice_versa?"></a>

OpenGSN team will be producing several guides and tutorials to help developers integrate GSN into their smart contracts and (d)applications. The process is rather straightforward and involves only inheriting a `BaseRelayRecipient` contract in the smart contract. It is up to developers to decide how and when they wish their users to send transactions via the GSN network.


## Can I use this with credit cards? <a id="can_i_use_this_with_credit_cards?"></a>

An interesting use case for the GSN network is allowing users to pay for transactions via credit cards. An example way this might work would be charging a user directly for tokens that are then used to access services via the (d)application. The tokens can be held in a contract representing a users balance, and when making a transaction using the GSN their token balance can be decremented to cover the 'cost' of each transaction.


## Do I have to run a relayer? <a id="do_i_have_to_run_a_relayer?"></a>

The GSN network is open source and anyone is free to run a relayer. It is envisioned that there will be many independent relayers each offering different uptime guarantees and service pricing. GSN enabled applications are free to use any relay that they choose, it is not required for a (d)application to run a relayer.


## Why do I have to deposit ETH in the RelayHub? <a id="why_do_i_have_to_deposit_eth_in_the_relayhub?"></a>

Relay providers deposit a stake in the `RelayHub` while `Paymasters` deposit a balance.

The balance deposited by `Paymasters` is used to refund relayers for the cost of relaying transactions plus a small fee so that they can cover their expenses and hopefully make a profit.

Relay providers are required to deposit a stake into the `RelayHub` to ensure good behavior. In the event a relayer behaves badly (for example attempting to reuse a nonce) their deposit can be slashed and collected by other relayers which can then prove on-chain a relayers bad behavior. This system of checks and balances is one of the features that keep the GSN safe and ensures that some forms of attacks against the network do not scale.


## Does my app need to hold money? <a id="does_my_app_need_to_hold_money?"></a>

No. The funds which are used by a smart contract application to pay for a user's gas costs are stored in the audited `RelayHub` contract. This contract is already deployed on every network (testnet, mainnet, etc..) and does not need to be managed by (d)app developers.

Developers need to ensure that the balance stored on RelayHub is sufficient to cover the cost of their users' transactions. If there is not a sufficient balance to cover the cost of relaying transactions, no transactions will be processed for the smart contract application until the balance is increased.

//== How do I manage this?
//
//OpenZeppelin has created several convenient web-based tools to manage your applications' GSN transactions. There is a tool for [(d)app developers](https://gsn.ethereum.org/recipients) as well as for [relayers](https://gsn.ethereum.org/relays).


## Does it work with other web3 providers? <a id="does_it_work_with_other_web3_providers?"></a>

As GSN does not require a user-supplied provider such as Metamask, it will work fine with or without a user-supplied provider. Developers will still need to connect the (d)app to a web3 provider, for example via [Infura](https://infura.io) to receive events or query the Ethereum blockchain.


