# Relay Deployment

Running a GSN relay server is a very simple task that can be broken up into the following sub-tasks:

* Having a machine running with publicly accessible static IP address
* Having a DNS entry for said machine
* Having an SSL certificate for said DSN entry
* Having an Ethereum address of a relay server (aka Manager Address) registered in GSN smart-contracts
* Having a sufficient Ethereum balance on a Manager Address to fund the relay's operations

You need at least one relay on a network, but for scalability and availability, it's better to have more.
For this tutorial we will use a specific toolset:

* Google Cloud Compute Engine VM
* Let's Encrypt Certificate Authority
* Docker Compose

Note that we do not provide instructions for a particular domain name registrar. You need some DNS service to configure a DNS name for your relay, as SSL certificate can't be attached to IP address. In the example below, we assume your DNS name is my.hostname.com

1. Go to the [Google Cloud Compute Engine UI](https://console.cloud.google.com/compute/instances)

1. Create a new instance micro instance. Select the "Container Optimized OS" option.

1. Allow http and https traffic to the instance.

1. Add your ssh public key to the instance.

1. Your new VM was assigned an IP address. In a DNS service of your choice, assign a DNS name to this machine (A record)

1. Checkout the code in GSN git repository, and navigate to the 'jsrelay' folder

1. Edit the `.env` file:

 .. Set the `RELAY_HUB` value to the address of the RelayHub contract for the target Ethereum network

 .. Set the `NODE_URL` value to a valid *https* (https:) Ethereum node URL. +
E.g for infura, it should be: `https://kovan.infura.io/v3/...`

 .. set the `HOST` value to a full domain name of your relay, e.g. `my.hostname.com`

1. Copy the edited `.env` file and the docker-compose.yml to your host:
+
```bash
scp .env docker-compose.yml myrelay.host.com:
```

1. `ssh` into the relay machine and create a `docker-compose` command line:
+
```bash
echo alias docker-compose="'"'docker run --rm \
-v /var/run/docker.sock:/var/run/docker.sock \
-v "$PWD:$PWD" \
-w="$PWD" \
docker/compose:1.24.0'"'" >> ~/.bashrc
source ~/.bashrc
```

1. run docker-compose with the following command:
+
```bash
docker-compose up -d
```
+
Note: to see the logs, you can do:
+
```bash
docker-compose logs
```

1. Check the relay is up:
+
```bash
curl https://my.host.name.com/getaddr
```
+
(note: it might take a minute or so the http server to complete setup)
+
You should see JSON output containing: `{"RelayManagerAddress":<address>, ...}`

1. Copy the `RelayManagerAddress` address. This is the 'Manager Address' that will be used later.

1. Send enough ether to this Manager Address to keep it running for some time.

1. Stake for this address and become an owner of the relay. The minimum stake is 1 eth, and minimum "unstake delay" 2000 blocks (roughly one week).
Through our command line:
+
```bash
npx gsn relayer-register --network <ethereumNodeUrl> --hub <RelayHubAddress> -m <ownerAccountMnemonicFile>  --from <ownerAddress> --relayUrl https://my.host.name.com

```
Or through truffle console (assuming you run on public network with local owner account with ether):
+
```javascript
 const hub = await RelayHub.at('{the above-mentioned RELAY_HUB address}')
 const smaddr = await hub.getStakeManager()
 const sm = await StakeMaanger.at(smaddr)
 const relayManagerAddress = '{the above copied Manager Address}'
 await sm.stakeForAddress(relayManagerAddress, 2000, {value:1e18})
 await sm.authorizeHub(relayManagerAddress, hub.address)
```

At this point, the relay server should notice it was staked for and register successfully. This might take 2-3 blocks.

Run curl again:

```bash
curl https://my.host.name.com/getaddr
```
You can see it says: Ready:true

You can logout from the relay machine and leave it up.
