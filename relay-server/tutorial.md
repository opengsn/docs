# Tutorial: Running a Relay Server for Fun and Profit

## Introduction

Users that rely on the GSN to access distributed applications (dapps) need to access relays through
the Internet to get their messages to the blockchain. Any user can access any relay to 
communicate with any supported dapp. If you are a dapp developer you can participate in the GSN by 
running a relay themselves and making it a [preferred relay](../faq/general.md#do_i_have_to_run_a_relayer).
You can run a Relay Server only to earn from relaying transaction fees.

This article explains how to run a relayer on a cloud VM using
[Google Cloud Platform Compute](https://cloud.google.com/compute),
though your can use any other hosting provider.

## Running a Relay Server For Profit

Relay Servers get reimbursed by Paymasters for the gas they spend sending transactions for 
users, plus a transaction fee that is defined by the network.

Profits of a Relay Server vary based on transaction volume, but there is little risk involved in running a Relay Server.
Minimal resources are required to run a Relay Server. For example, [GCP does not charge you for running a single micro
instance](https://cloud.google.com/free/docs/gcp-free-tier#free-tier-usage-limits).

When you want to get your stake back you use the same account you used to
register the relayer to unstake and deregister it. After the unstake period, which
is about a week, you can withdraw all your locked funds.

## Directions

### Requirements

* The Relay Server Virtual Machine with docker installed, with a publicly accessible static IP address.
* A DNS service (such as GoDaddy, NameCheap, or DuckDNS) to give your host a DNS name.
* Enough Ether to activate and fund the Relay Server.
* For technical assistance, please use our [discord channel](https://discord.gg/NXXTCbh58s)

### The Relay Server Virtual Machine

#### Initial Setup

First you need to set up the virtual machine (VM) that will run the relay server.

1. Go to [the GCP console](https://console.cloud.google.com/compute/instances).
1. Click **CREATE INSTANCE**.
1. Set these parameters (you can accept the default for all the others):

   | Heading | Parameter | Value |
   | ------- | --------- | ----- |
   | Name    |           |Select a meaningful name |
   | Machine configuration | Machine type | e2-micro |
   | Boot disk | Container Optimized OS | Selected |
   | Firewall | Allow HTTPS traffic | Selected |
   | Firewall | Allow HTTP traffic | Selected |

1. Click **Create**.
1. Obtain a DNS entry for a registrar service. Some major DNS services are: [Namecheap](http://www.namecheap.com), [GoDaddy](http://www.godaddy.com), or even a free service,
   such as [DuckDNS](https://www.duckdns.org)
1. Configure the external IP of the relay in the DNS by adding an "A" record for that IP your DNS service. Note: by default, public IP is "ephemeral" and might change after reboot.
   
#### The Docker Container

Now that the VM is running and has a DNS entry, the next step is to actually 
run the relay software. It runs inside a docker container. You configure it using 
a script called `rdc`, which needs to run with more permissions than
[the GCP container-optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/security) allows. 
So you need to run it from a different computer that is authorized to SSH 
into the relayer VM.

::: tip Note
If you don't have this permission restriction, you can also download the script directly on the vm, and run the following commands using the "local" option.
:::


1. Open SSH to the relayer VM.
1. Download the relayer configuration files.

_The `docker-compose.yml` file must be placed at the home folder. The `gsn-relay-config.json` must be placed inside a `config` folder._

   ```bash
   TODO TODO: remove relaydc, publish dc.yaml!!!
   curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/docker-compose.yml > docker-compose.yml
   mkdir config
   curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/config-sample/gsn-relay-config.json > config/gsn-relay-config.json
   ```
1. Edit `docker-compose.yml`:

1. In `docker-compose.yml`, specify:
   | Parameter | Value          |
   | --------- | -------------- |
   | HOST      | &lt;Your host name> |
   | HTTP_STAGE | production |
1. Press Ctrl-O and then Enter to save the modified file.
1. Press Ctrl-X to exit.
1. Edit `config/gsn-relay-config.json` to specify:
   | Parameter | Value |
   | --------- | ----- |
   | url | Your Relay Server URL exactly as it is accessed by GSN Clients |
   | relayHubAddress | The address for the RelayHub on the network you are using. [See this list](/networks/addresses.md). |
   | managerStakeTokenAddress | The address for the ERC-20 token used for stake on the network you are using. [See this list](/networks.md). |
   | ownerAddress | The owner account that will be used by relayer-register, below |
   | ethereumNodeUrl | The URL to a node on the network you wish to use. If you do not know what to put here, get a [free Infura account](https://infura.io), create a project, and look at **KEYS > ENDPOINTS** for your network. Use the endpoint that starts with https:// |
1. Download and run the docker images 
   ```bash
   docker-compose up
   ```
1. To see the progress of the HTTPS server (the slowest component to set up), get the id of the "https-portal" container and run:
   ```bash
   docker ps
   docker logs <https-portal container-id>
   ```
1. When you see this line it means the setup is done. You can close the SSH window.
   ```
   [services.d](https-portal_1  | ) done.
   ```
1. Browse to https://&lt;your&nbsp;DNS&nbsp;name&gt;/getaddr . 
   You should receive a JSON file with addresses and status. 
   The `ready` setting should be `false`, because it isn't registered with 
   the relay hub yet.
  
You can also check the activity of the relayer when you are on the vm. Get the id of the "jsrelay" container.
```bash
docker ps
docker logs <jsrelay container-id>
```

## Relayer Staking and Registration

We need to register the relayer with the Relay Hub. This step has several purposes:

* Stake Ether or any supported ERC-20 token on the relay's honesty, so relays won't try to abuse the 
  system (for example by submitting invalid messages)
* Put up the initial relayer budget for sending messages. The default is 2 Ether.
* Add the relayer to the relayers list so clients will know they can 
  use it for free messages

_You will need to make transactions from an account specified as `ownerAddress` in the Relay Server configuration.
Make sure you have this account selected in MetaMask for the following steps._

1. Go to `https://relays.opengsn.org/` and click "Register New Relay".
1. Enter your Relay Server URL and click "Register".
1. Follow the steps on the Relay Registration page.
1. Open `https://&lt;your&nbsp;DNS&nbsp;name&gt;/gsn1/getaddr` . See that the relayer is now 
   ready. Congratulations.

::: tip Note
In order to test your relayer, add its URL to the list of `preferedRelays` for your client's RelayProvider.
Otherwise, your client is free to pick any active relay.
:::

::: danger
The relayer generates its own Ethereum keystores & addresses internally.
Do not tamper with the files or use these addresses to any other purpose.
The relayer is staked on the network, performing other actions may result in penalization and loss of funds.
:::
