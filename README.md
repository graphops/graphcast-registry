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

To deploy the contract, provide environmental variables as shown in `.env.example` for whichever network you want to deploy to ({NETWORK}_PRIVATE_KEY, {NETWORK}_ETH_PROVIDER, ETHERSCAN_API_KEY, {NETWORK}_GNOSIS_SAFE, PROXY_ADDRESS). 

With Hardhat CLI:

- `npx hardhat node` if you would like to deploy in a local environment.
- `npx hardhat compile` to compile the Registry contract.
- `npx hardhat run scripts/deploy.js --network [localhost/goerli/mainnet]` to simply deploy the contract. 
- `npx hardhat run scripts/upgrade.js --network [localhost/goerli/mainnet]` to upgrade the contract. 
- `npx hardhat run scripts/deploy_verify_admin.js --network [localhost/goerli/mainnet]` to run the script that deploys, verifies, and update admin address of the contract. Provide the Gnosis safe address as the proxy admin for secure upgrades.

## Current addresses

The contract proxy addresses are listed below, which should link to implementation and proxyAdmin addresses.

| Network ID         | Network                           | Proxy Contract Address                                                               |
| --------- | ------------------------------ | ------------------------------------------------------------------------- |
| 1 | `Mainnet`          | `0x89f97698d6006f25570cd2e31737d3d22aedcbcf`             |
| 5 | `Goerli`           | `0x26ebbA649FAa7b56FDB8DE9Ea17aF3504B76BFA0`                                                |
| 42161 | `Arbitrum-one`           | ___                             |
| 421613 | `Arbitrum-goerli`         | ___                  |


Setting a graphcast id on the registry require validation through The Graph network contracts, listed below. 

- Service Registry is used in the Registry subgraph to validate an indexer account on The Graph, as it checks if an Eth address is a registered indexer to the Graph network.
- Staking contract validates the indexer authorization to an operator. The registry contract uses the staking contract `isOperator` function to allow either indexer address or an indexer operator to call setGraphcastID.

| Network ID         | Network                           | Service Registry                            |Staking contract                            |
| --------- | ------------------------------ | ------------------------------------------ | ------------------------------------------ |
| 1 | `Mainnet`          |    0xaD0C9DaCf1e515615b0581c8D7E295E296Ec26E6          | 0xF55041E37E12cD407ad00CE2910B8269B01263b9 |
| 5 | `Goerli`           | 0x7CF8aD279E9F26b7DAD2Be452A74068536C8231F |    0x35e3Cb6B317690d662160d5d02A5b364578F62c9 | 
| 42161 | `Arbitrum-one`           |      0x072884c745c0A23144753335776c99BE22588f8A                        | 0x00669A4CF01450B64E8A2A20E9b1FCB71E61eF03 |
| 421613 | `Arbitrum-goerli`         |    0x07ECDD4278D83Cd2425cA86256634f666b659e53               | 0xcd549d0C43d915aEB21d3a331dEaB9B7aF186D26 |


## Configuring

| Name                           | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| `{NETWORK}_PRIVATE_KEY`           | Eth Network address private key                                                |
| `{NETWORK}_ETH_PROVIDER`          | Eth Network block provider API endpoint (ex. Infura, Alchemy, ...)             |
| `{NETWORK}_GNOSIS_SAFE`           | Eth Network Gnosis Safe address for contract owner                             |
| `{NETWORK}_PROXY_ADDRESS`         | Eth Network Contract proxy address for upgrading the contract                  |
| `ETHERSCAN_API_KEY`            | Etherscan account API key used for contract verification                  |
| `DEFENDER_TEAM_API_KEY`        | Openzeppelin Upgrade defender key for upgrading the contract              |
| `DEFENDER_TEAM_API_SECRET_KEY` | Openzeppelin Upgrade defender secret key for upgrading the contract       |

## Upgrading

After writing the new contract version (`GraphcastRegistryV#`), update `upgrade.js` with the new version number, double check the proxy address, and run the script.

## Contributing

We welcome and appreciate your contributions! Please see the [Contributor Guide](/CONTRIBUTING.md), [Code Of Conduct](/CODE_OF_CONDUCT.md) and [Security Notes](/SECURITY.md) for this repository.
