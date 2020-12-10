# Running Relays and Fun and (Maybe Someday) Profit
Ori Pomerantz <qbzzt1@gmail.com>

{author} -- {email}


## Introduction <a id="introduction"></a>

Users that rely on GSNv2 to access distributed applications (dapps) need to access relays through
the Internet to get their messages to the blockchain. While any user can access any relay to 
communicate with any dapp, it is expected that dapp developers will contribute back to GSNv2 by 
running a relay or two. Also, if you buy and hold ether as an investment you might as well run a relay
and earn a bit extra (see explanation)

In this article you learn how to run a relay on a cloud VM using
[Google Cloud Platform Compute](https://cloud.google.com/compute) (it's just a suggestion, you can
use any hosting or cloud provider).

Behind the scenes the relay server also uses 
[Let's Encrypt Certificate Authority](https://letsencrypt.org/certificates/) to get a 
certificate, but you do not need to worry about that process.



## Relays as an investment <a id="relays_as_an_investment"></a>

If you are going to buy and hold ether as an investment, you might as well run a 
GSN relay with it.
Relays get reimbursed by paymasters for the gas they spend sending transactions for 
users, plus a 
little bit more. It isn't an impressive interest rate, but it's better than nothing and 
it is a low risk
investment. [
GCP does not charge you for running a single micro instance](https://cloud.google.com/free/docs/gcp-free-tier#free-tier-usage-limits).

When you want to get your investment back you use the same account you used to 
register the relay to unstake (deregister) it. After the unstake period, which is about
a week, you can request all your unlocked funds.



### How much do you get paid?

When you configure the `gsn-relay-config.json` file later, you will see two variables, 
`baseRelayFee` and `pctRelayFee`. 
For every transaction you relay you can expect to earn `baseRelayFee` 
plus `pctRelayFee`% of the cost of the gas for the transaction (in addition to being
reimbursed for gas used).

{% hint style="note" %}
### NOTE:
The client code selects relays based on price. If your fees are too 
{% endhint %}
high, you will not
get anything. [Click here to see what other 
relays are charging](https://relays.opengsn.org/).



## Directions <a id="directions"></a>


### The Relay VM

#### Initial Setup

First you need to set up the virtual machine (VM) that will run the relay server.

1. Go to [the GCP console](https://console.cloud.google.com/compute/instances).
1. Click **CREATE INSTANCE**.
1. Set these parameters (you can accept the default for all the others):
+
|===
| Heading | Parameter | Value

| Name
|
| Select a meaningful name

| Machine configuration 
| Machine type 
| e2-micro

| Container 
| Deploy a container image to this VM instance
| Selected

| Container image
|
| * (it does not matter, you just need to type something)

| Firewall 
| Allow HTTPS traffic 
| Selected

| Firewall 
| Allow HTTP traffic 
| Selected (you need it to create the certificate,
  and for reissuing it periodically)
|===

1. Click **Create**.
1. Obtain a DNS entry for your service. You can use a free entry from a service such as
  [DuckDNS](https://www.duckdns.org)
1. Configure the external IP of the relay in the DNS. As long as you do not have to
  reboot the relay, the IP value does not change.

#### The Docker Container

Now that the VM is running and has a DNS entry, the next step is to actually 
run the relay software. It runs inside a docker container. You configure it using 
a script called `rdc`, which needs to run with more permissions than
[the GCP
container-optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/security) allows. 

One easy solution is to create a temporary management VM. This VM can run in the
same GCP account, and that way be able to ssh to the relay VM.

1. Go to [the GCP console](https://console.cloud.google.com/compute/instances).
1. Click **CREATE INSTANCE**.
1. Set these parameters (accept the default for all the others):
+
|===
| Heading | Parameter | Value

| Machine configuration 
| Machine type 
| e2-micro

| Boot disk
| Images
| Debian GNU/Linux 10 (buster)

| Identity and API access
| Access scopes
| All full access to all Cloud APIs
|===

1. Open SSH to the management VM to download the relay configuration setup and 
  put it on the relay VM:
+
```bash
curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/rdc > rdc
chmod +x rdc
./rdc <relay VM name> addalias
yes
```
1. Delete the management VM, you no longer need it.
1. Open SSH to the relay VM.
1. Download the relay configuration files.
+
```bash
curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/.env > .env
mkdir config
curl https://raw.githubusercontent.com/opengsn/gsn/master/dockers/relaydc/config-sample/gsn-relay-config.json > config/gsn-relay-config.json
```
1. Edit `.env`:
+
```bash
nano .env
```
1. In `.env`, specify:
+
|===
| Parameter | Value

| HOST
| Your host name
|===
1. Press Ctrl-O and then Enter to save the modified file.
1. Press Ctrl-X to exit.
1. Edit `config/gsn-relay-config.json` to specify:
+
|===
| Parameter | Value

| baseRelayFee
| The base fee that your relay will charge

| pctRelayFee
| The percent fee that your relay will charge

| versionRegistryAddress
| The address for the version registry on the network you are using. 
  [See this list](https://docs.opengsn.org/gsn-provider/networks.html).

| ethereumNodeUrl
| The URL to a node on the network you wish to use. If you do not know what to put here,
  get a [free Infura account](https://infura.io), create a project, and look at 
  **KEYS > ENDPOINTS** for your network. Use the endpoint that starts with https://
|===
1. Download and run the docker images 
+
```bash
rdc config
rdc up -d
```
1. Wait until the second `rdc` command finishes. 
1. To see the progress of the HTTPS server (the slowest component to set up), run
+
```bash
rdc logs -f https-portal
```
1. When you see this line it means the setup is done. You can close the SSH window.
+
[source]
```
[services.d](https-portal_1  | ) done.
```
1. Browse to https://<your-DNS-name>/gsn1/getaddr. 
  You should receive a JSON file with addresses and status. 
  The `ready` setting should be `false`, because it isn't registered with 
  the relay hub yet.
  


## Relay Staking and Registration <a id="relay_staking_and_registration"></a>

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
+
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
+
```bash
docker run --rm -ti -v $PWD:$PWD \
    opengsn/cli relayer-register \
    --network <the ethereumNodeURL you used for the relay> \
    --gasPrice <get from the link above, specify in Gwei> \
    --relayUrl https://<your hostname for the relay>/gsn1 \
    -m `pwd`/pass12
```
+
{% hint style="note" %}
### NOTE:
To avoid risking your main account, 
{% endhint %}
[you can create 
a dedicated address](https://github.com/qbzzt/etherdocs/blob/master/paper_wallet.md) and transfer 3.001 ether to it. One ether is the 
stake that you lose if your relay doesn't relay messages in a timely manner, 
two ethers are the initial funds for the relay, and the 0.001 is for the gas 
needed for the registration itself. Make sure to keep the mnemonic, you need 
will it at some point to unstake the relay and get back your ether 
(and some extra).
+
1. Browse to https://<your-DNS-name>/gsn1/getaddr. See that the relay is now 
  ready. Congratulations.


## Unstaking <a id="unstaking"></a>

Eventually you will want the ether back. To do so:

1. [Go here](https://qbzzt.github.io/ethereum/gsn/unstake.html) with your wallet (for example, MetaMask) set 
  to the account that created the relay in the first place.
1. Enter your `RelayManagerAddress` (from https://<your-dns-name>/getaddr) and click **Unlock your stake**.
1. To see the block in which you'll be able to get back your stake either open the browser's console or
  run this command on the relay. Either way, look for `withdrawBlock`.
+
```bash
docker logs default_gsn1_1 2>1 | grep withdrawBlock
```
1. Use https://<network name>.etherscan.io to see the latest block, wait until it is past the withdrawal block.
1. Go back to [the unstake page](https://qbzzt.github.io/ethereum/gsn/unstake.html) and enter 
  the `RelayManagerAddress` again.
1. Click **Withdraw previously unlocked stake**.





## Conclusion <a id="conclusion"></a>

In this article you learned how to create a GSNv2 relay and connect it to the network. The more relays
are available, the better the performance for users who rely on GSNv2 to access dapps without spending
ether.
