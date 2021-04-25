const { ethers, Wallet } = require('ethers')
const fs = require('fs')
const { DecryptUsingSymmetricKey, EncryptUsingSymmetricKey } = require('./app/utils/crypto-utils')

require('dotenv').config()

const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET, MNEMONIC } = process.env
const options = {
  INFURA_ID,
  INFURA_SECRET,
}

const provider = new ethers.providers.getDefaultProvider("https://testnet.tomochain.com/") 
// const provider = new ethers.providers.InfuraProvider('rinkeby', options)

const abi = JSON.parse(fs.readFileSync('abi.json'))
const contract = new ethers.Contract("0xe6b7262216f7dbd276c163a01f02e3ed73169df5", abi.abi)


