# Web app: Blockchain's Wallet

## About: 
A blockchain wallet is a digital wallet that allows users to store and manage their coin. A blockchain wallet allows transfers in cryptocurrencies.

## Version
[![GitHub version](https://badge.fury.io/gh/haipro287%2Fhpr-t0ken.svg)](https://badge.fury.io/gh/haipro287%2Fhpr-t0ken)
### Key function:
* Transfers in cryptocurrencies
* Ask for charity
* Manage account's information

### Technologies:
* Docker
* MongoDB
* NodeJS
* ReactJS
* Ethereum

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/haipro287/hpr-t0ken
   ```
2. Create your `.env` file same as `env.example` file in front-end, back-end, block-chain directory

3. Install MongoDB via docker or use your own MongoDB
   ```sh
   docker-compose up -d
   ```
   
4. Install Back-end
   ```sh
   cd back-end
   yarn
   yarn start
   ```

5. Install front-end 
   ```sh
   cd front-end
   yarn
   yarn start
   ```
   
6. Ethereum smart contract: compile and use by your own
   ```sh
   ganache-cli
   cd blockchain
   yarn
   yarn compile
   yarn deploy
   ```
   or use my deployed contract in Rinkeby testnet at 0x690d5f4e017224871c097bf0d42e9f7a867995b4 (compile abi.json youself hehe :)))
   
