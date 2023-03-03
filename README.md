# Graphcast Registry Contract

[![Docs](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://docs.graphops.xyz/graphcast/intro)

## Introduction

Graphcast is a decentralized, distributed peer-to-peer (P2P) communication tool that allows Indexers across the network to exchange information in real-time. This registry contract allows Indexers to register a separate identity to send messages on the Graphcast network as an Indexer securely. 

To see the full idea behind Graphcast, you can check out our [docs](https://docs.graphops.xyz/graphcast/intro) for it.

## Features

Graphcast Registry contract allows an address to set GraphcastID by calling `setGraphcastIDFor(graphcastID_address)`. The relationship between an indexer address to its GraphcastID is limited to 1:1, and cannot be set to itself. This restriction provides consistency and security for the indexer identity to operate on Graphcast as one GraphcastID operating across radio applications. 

The initial GraphcastID for all addresses are simply 0x0. Calling `setGraphcastIDFor` with a new address will overwrite the previous relationship, and can be unset completely by setting the address back to 0x0.

The contract is verified, upgradable, and owned by a Gnosis safe multisig. Any upgrades to the Registry contract will require signature from the multisig.

## Quickstart

To deploy the contract, provide environmental variables as shown in `.env.example` (GOERLI_PRIVATE_KEY, GOERLI_ETH_PROVIDER, ETHERSCAN_API_KEY, GNOSIS_SAFE, PROXY_ADDRESS, MAINNET_ETH_PROVIDER, MAINNET_PRIVATE_KEY). 

With Hardhat CLI:

- `npx hardhat node` if you would like to deploy in a local environment.
- `npx hardhat compile` to compile the Registry contract.
- `npx hardhat run scripts/deploy.js --network [localhost/goerli/mainnet]` to simply deploy the contract. 
- `npx hardhat run scripts/upgrade.js --network [localhost/goerli/mainnet]` to upgrade the contract. 
- `npx hardhat run scripts/deploy_verify_admin.js --network [localhost/goerli/mainnet]` to run the script that deploys, verifies, and update admin address of the contract. 

## Configuring

| Name                         | Description                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `GOERLI_PRIVATE_KEY`         | Goerli address private key                                                |
| `GOERLI_ETH_PROVIDER`        | Goerli block provider API endpoint (ex. Infura, Alchemy, ...)             |
| `GOERLI_GNOSIS_SAFE`         | Goerli Gnosis Safe address for contract owner                             |
| `GOERLI_PROXY_ADDRESS`       | Goerli Contract proxy address for upgrading the contract                  |
| `MAINNET_PRIVATE_KEY`        | Mainnet address private key                                               |
| `MAINNET_ETH_PROVIDER`       | Mainnet block provider API endpoint (ex. Infura, Alchemy, ...)            |
| `MAINNET_GNOSIS_SAFE`        | Mainnet Gnosis Safe address for contract owner                            |
| `MAINNET_PROXY_ADDRESS`      | Mainnet Contract proxy address for upgrading the contract                 |
| `ETHERSCAN_API_KEY`          | Etherscan account API key used for contract verification                  |

## Upgrading

After writing the new contract version (`GraphcastRegistryV#`), update `upgrade.js` with the new version number, double check the proxy address, and run the script.

## Contributing

We welcome and appreciate your contributions! Please see the [Contributor Guide](/CONTRIBUTING.md), [Code Of Conduct](/CODE_OF_CONDUCT.md) and [Security Notes](/SECURITY.md) for this repository.
