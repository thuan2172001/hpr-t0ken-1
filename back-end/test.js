const { ethers } = require('ethers')
const fs = require('fs')
const { DecryptUsingSymmetricKey, EncryptUsingSymmetricKey } = require('./app/utils/crypto-utils')

require('dotenv').config()

const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET, MNEMONIC } = process.env
const options = {
  INFURA_ID,
  INFURA_SECRET,
}

const provider = new ethers.providers.InfuraProvider('rinkeby', options)
const abi = JSON.parse(fs.readFileSync('abi.json'))

