# Deployment Reference

Prerequisites 

* A machine with docker installed, with a publicly accessible static IP address.
* A DNS service (such as GoDaddy, NameCheap, or DuckDNS) to give your host a DNS name
* Ether (roughly 3 eth) to activate and fund the relayer.
* For technical assistance, please use our [discord channel](https://discord.gg/NXXTCbh58s)
* Make sure to join the [announcement channel](https://discord.gg/D67qUxjHRp), to get notifications on relayer configuration and upgrades.

## Start a Machine

This document demonstrate using Google Compute Engine, but you can use any hosting service
The reason we use GCP, is that it has a "free tier" not limited in time (for a single micro instance),
and that it comes with "docker" pre-installed.


1. Go to the [Google Cloud Compute Engine UI](https://console.cloud.google.com/compute/instances)
1. Create a new instance.
1. For "Machine type", select **"e2-micro"**. 
1. In "Boot Disk" change the Operating system to **"Container Optimized OS"**.
1. Allow http and https traffic into the instance.
1. **Create** the instance.
1. Once you can get its public IP address, add an "A" record for that IP your DNS service.
1. To easily SSH into the machine, add your ssh public key, to the "Settings/Metadata/SSH keys"

## Install a GSN Relayer

1. Checkout the code in GSN git repository, and navigate to the `dockers/relaydc` folder
1. edit `.env` file and set the HOST value to the public DNS name of your host.
1. edit the `config-sample/gsn-relay-config.json`:
   * Edit the `ethereumNodeUrl` to point to a valid RPC url of the network you want to use.
   * Edit the `relayHubAddress` to point to the right entry for your network from the [Deployed networks](/networks.md)
   * Edit the `managerStakeTokenAddress` to the default (wrapped eth) token of the RelayHub
   * Edit hte `ownerAddress` to your owner account, used by `relayer-register`, below.
1. copy the files to the host:

    - The `.env` file must be placed at the home folder
    - The `gsn-relay-config.json` must be placed inside a `config` folder

1. to bring up the relayer, run the command

    ```
    ./rdc HOSTNAME up -d
    ```

1. To view the log, run:

   ```
   ./rdc HOSTNAME logs [gsn1]
   ```   

   Note that initial startup takes about a minute (to create a private key and register an SSL certificate)

1. Check the relayer is up:

    ```
    curl https://HOSTNAME/gsn1/getaddr
    ```

    You should see JSON output containing: `{ .. "ready":false, ...}`, meaning the relayer is up 
    and running, but not registered yet.

1. To register and fund using the [gsn relayer-register](../javascript-client/gsn-helpers.md#register) command

1. Wait for the Relayer to complete the registration. It should take 1-2 minutes.

1. Run curl again:

    ```bash
    curl https://my.host.name.com/getaddr
    ```
    You can see it says: `ready:true`


Congratulations. You have a running relayer.
You should now be able to see your relayer in the list of all relayers: https://relays.opengsn.org

Note: in order to test your relayer, add its URL to the list of `preferedRelays` for your client's RelayProvider.
Otherwise, your client is free to pick any active relay.

