# Legacy

## What is the difference between GSNv1 and GSNv2?

The major changes in GSNv2:

- **RelayRecipient** no longer handle its own gas. it only uses `_msgSender()` (instead of `msg.sender`) to determine its caller.
- A new entity named **Paymaster** was added. A single Paymaster can handle the gas of one or several RelayRecipient contracts
- Relays can have multiple worker addresses, so that they can have more than one outstanding tx
- Recipient trusts a single, small contract (**TrustedForwarder**) instead the entire **RelayHub** codebase (since recipient doesn't handle gas, all it cares is that the signature of the sender was verified, and the request is not a replay)
