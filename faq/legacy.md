# Legacy

## What is the difference between GSNv1 and GSNv2?

The major changes in GSNv2:

- **RelayRecipient** no longer handle its own gas. it only uses `_msgSender()` (instead of `msg.sender`) to determine its caller.
- A new entity named **Paymaster** was added. A single Paymaster can handle the gas of one or several RelayRecipient contracts
- Relays can have multiple worker addresses, so that they can have more than one outstanding tx
- Recipient trusts a single, small contract (**TrustedForwarder**) instead the entire **RelayHub** codebase (since recipient doesn't handle gas, all it cares is that the signature of the sender was verified, and the request is not a replay)

## My contract is using OpenZeppelin. How do I add GSN support?

OpenZeppelin supports GSNv1 in their libraries. They are now in the process of removing GSN from their library.
Any further GSN support is done by using OpenGSN libraries directly.

Still, they have basic support for hooking GSN in all their contracts, and that support will stay.

- Make sure you use `OpenZeppelin@3` (which support solidity 0.6)
- You should make the `_msgSender()` and `_msgData()` of both GSN and OpenZeppelin use GSN's implementation (sorry about the syntax: its a solidity requirement...)
- As any GSN contract, you must initialize the **trustedForwarder** member, either through the constructor, or via a setter (protected, so only admin/owner can set it)
- You contract should look like this:

  ```solidity
  pragma solidity ^0.6.10;
  import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";

  contract MyContract is BaseRelayRecipient, Ownable {
    function _msgSender() internal override(Context, BaseRelayRecipient)
    view returns (address payable) {
      return BaseRelayRecipient._msgSender();
    }

    function _msgData() internal override(Context,BaseRelayRecipient)
    view returns (bytes memory ret) {
      return BaseRelayRecipient._msgData();
    }

    string public override versionRecipient = "2.0.0";

    function setForwarder(address forwarder) public onlyOwner {
      trustedForwarder = forwarder;
    }
    ...
  }
  ```

