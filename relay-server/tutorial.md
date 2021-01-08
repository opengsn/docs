# Tutorial: Running a Relay Server for Fun and Profit

## Introduction

Users that rely on GSNv2 to access distributed applications (dapps) need to access relays through
the Internet to get their messages to the blockchain. While any user can access any relay to 
communicate with any dapp, it is expected that dapp developers will contribute back to GSNv2 by 
running a relay or two. Also, if you buy and hold ether as an investment you might as well run a relay
and earn a bit extra (see explanation)

In this article you learn how to run a relay on a cloud VM using
[Google Cloud Platform Compute](https://cloud.google.com/compute),
though your can use any other hosting provider.

## Relays as an investment

Relays get reimbursed by paymasters for the gas they spend sending transactions for 
users, plus a transaction fee that you can configure.

Without significant transaction volume you won't necessarily get a super
impressive interest rate, but you will get paid to support decentralization
while taking little to no risk. Minimal resources are required to run a relay
server so your costs will be low.  For example, [GCP does not charge you for running a single micro
instance](https://cloud.google.com/free/docs/gcp-free-tier#free-tier-usage-limits).

When you want to get your ETH back you use the same account you used to
register the relay to unstake (deregister) it. After the unstake period, which
is about a week, you can request all your locked funds.

### Setting your relay server's transaction fee 

When you configure the `gsn-relay-config.json` file later, you will see two variables, 
`baseRelayFee` and `pctRelayFee`. 
For every transaction you relay you can expect to earn `baseRelayFee` (wei) 
plus `pctRelayFee`% of the cost of the gas for the transaction (in addition to being
reimbursed for gas used).

::: tip Note
The client code selects relays based on price. If your fees are too high, you will not get anything. 
[Click here to see what OpenGSN public service relays are charging](https://relays.opengsn.org/).
:::


## Directions

### The Relay VM

#### Initial Setup

First you need to set up the virtual machine (VM) that will run the relay server.

1. Go to [the GCP console](https://console.cloud.google.com/compute/instances).
1. Click **CREATE INSTANCE**.
1. Set these parameters (you can accept the default for all the others):

   | Heading | Parameter | Value |
   | ------- | --------- | ----- |
   | Name    |           |Select a meaningful name |
   | Machine configuration | Machine type | e2-micro |
   | Container | Deploy a container image to this VM instance | Selected |
   | Container image |  | * (it does not matter, you just need to type something) |
   | Firewall | Allow HTTPS traffic | Selected |
   | Firewall | Allow HTTP traffic | Selected |

1. Click **Create**.
1. Obtain a DNS entry for your service. Use your favorite DNS service, e.g. as [Namecheap](http://www.namecheap.com), [GoDaddy](http://www.godaddy.com), or even a free service,
   such as [DuckDNS](https://www.duckdns.org)
1. Configure the external IP of the relay in the DNS. Note: by default, public IP is "ephemeral" and might change after reboot.
   
#### The Docker Container

Now that the VM is running and has a DNS entry, the next step is to actually 
run the relay software. It runs inside a docker container. You configure it using 
a script called `rdc`, which needs to run with more permissions than
[the GCP container-optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/security) allows. 
So you need to run it from a different computer that is authorized to SSH 
into the relay VM.


1. On a computer that is authorized to ssh into the relay VM, 
   download the relay configuration setup and 
   put it on the relay VM:
   ```bash
   curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/rdc > rdc
   chmod +x rdc
   ./rdc <relay VM name> addalias
   yes
   ```
1. Open SSH to the relay VM.
1. Download the relay configuration files.
   ```bash
   curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/.env > .env
   mkdir config
   curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/config-sample/gsn-relay-config.json > config/gsn-relay-config.json
   ```
1. Edit `.env`:
   ```bash
   nano .env
   ```
1. In `.env`, specify:
   | Parameter | Value          |
   | --------- | -------------- |
   | HOST      | Your host name |
1. Press Ctrl-O and then Enter to save the modified file.
1. Press Ctrl-X to exit.
1. Edit `config/gsn-relay-config.json` to specify:
   | Parameter | Value |
   | --------- | ----- |
   | HOST | Your host name |
   | baseRelayFee | The base fee that your relay will charge |
   | pctRelayFee | The percent fee that your relay will charge |
   | versionRegistryAddress | The address for the version registry on the network you are using. [See this list](../deployments/networks.md). |
   | ethereumNodeUrl | The URL to a node on the network you wish to use. If you do not know what to put here, get a [free Infura account](https://infura.io), create a project, and look at **KEYS > ENDPOINTS** for your network. Use the endpoint that starts with https:// |
1. Download and run the docker images 
   ```bash
   rdc config
   rdc up -d
   ```
1. Wait until the second `rdc` command finishes. 
1. To see the progress of the HTTPS server (the slowest component to set up), run
   ```bash
   rdc logs -f https-portal
   ```
1. When you see this line it means the setup is done. You can close the SSH window.
   ```
   [services.d](https-portal_1  | ) done.
   ```
1. Browse to https://&lt;your&nbsp;DNS&nbsp;name&gt;/gsn1/getaddr . 
   You should receive a JSON file with addresses and status. 
   The `ready` setting should be `false`, because it isn't registered with 
   the relay hub yet.
  


## Relay Staking and Registration

We need to register the relay with the Relay Hub. This has several purposes:

* Stake one ether on the relay's honesty, so relays won't try to abuse the 
  system (for example by submitting invalid messages)
* Put up the initial relay budget for sending messages. The default is 2 Ether.
* Add the relay to the relay list so clients will know they can 
  use it for free messages

You can use any UNIX computer for this process, but it requires the mnemonic, the
twelve word pass phrase for your account. This is an **extremely** sensitive piece
of information, which you never want away from your control. 

1. Install the GSN command line interface on Docker. It has to be the Docker version
   to be able to specify the gas price for the registration transaction.
   ```bash
   sudo docker image pull opengsn/cli
   ```
1. Create a file `pass12` with the twelve word mnemonic for the account you'll
   use to fund the relay.
1. Get the current gas price for transactions 
   [from here](https://etherscan.io/gastracker). The low cost should be sufficient
1. Register the relay. You may get an error saying that after 60 seconds the relay
   is not yet ready. If so, ignore it, it is usually just because it takes a bit 
   longer.
   ```bash
   docker run --rm -ti -v $PWD:$PWD \
       opengsn/cli relayer-register \
       --network <the ethereumNodeURL you used for the relay> \
       --gasPrice <get from the link above, specify in Gwei> \
       --relayUrl https://<your hostname for the relay>/gsn1 \
       -m `pwd`/pass12
   ```
   ::: tip Note
   To avoid risking your main account, [you can create 
   a dedicated address](https://github.com/qbzzt/etherdocs/blob/master/paper_wallet.md) and transfer 3.001 ether to it. One ether is the 
   stake that you lose if your relay doesn't relay messages honestly, 
   two ethers are the initial funds for the relay, and the 0.001 is for the gas 
   needed for the registration itself. Make sure to keep the mnemonic, you need 
   will it at some point to unstake the relay and get back your ether 
   (and some extra).
   :::
1. Browse to https://&lt;your&nbsp;DNS&nbsp;name&gt;/gsn1/getaddr . See that the relay is now 
   ready. Congratulations.


## Unstaking

Eventually you will want the ether back. To do so:

1. [Go here](https://qbzzt.github.io/ethereum/gsn/unstake.html) with your wallet (for example, MetaMask) set 
  to the account that created the relay in the first place.
1. Enter your `RelayManagerAddress` (from https://&lt;your&nbsp;DNS&nbsp;name&gt;/getaddr) and click **Unlock your stake**.
1. To see the block in which you'll be able to get back your stake either open the browser's console or
  run this command on the relay. Either way, look for `withdrawBlock`.
```bash
docker logs default_gsn1_1 2>1 | grep withdrawBlock
```
1. Use https://&lt;network&nbsp;name&gt;.etherscan.io to see the latest block, wait until it is past the withdrawal block.
1. Go back to [the unstake page](https://qbzzt.github.io/ethereum/gsn/unstake.html) and enter 
  the `RelayManagerAddress` again.
1. Click **Withdraw previously unlocked stake**.





## Conclusion

In this article you learned how to create a GSNv2 relay and connect it to the network. The more relays
are available, the better the performance for users who rely on GSNv2 to access dapps without spending
ether.


----------------------------------------------

Original version of this tutorial by Ori Pomerantz qbzzt1@gmail.com

