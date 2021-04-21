const CryptoJS = require('crypto-js')
const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET } = process.env
const hash256 = require('hash.js')
const { ethers } = require('ethers')
const fs = require('fs')
const { EncryptUsingSymmetricKey, Hash256 } = require('./crypto-utils')
const { create } = require('../models/user')


// const abi = JSON.parse(fs.readFileSync('abi.json'))

// const contract = new ethers.Contract(address, abi.abi, provider)

const createWallet = (password) => {
    const projectId = INFURA_ID
    const address = CONTRACT_ADDRESS
    const projectSecret = INFURA_SECRET
    const provider = new ethers.providers.InfuraProvider('rinkeby', {
        projectId,
        projectSecret
    })

    const hashPassword = Hash256(password)
    const wallet = ethers.Wallet.createRandom().connect(provider)
   return {
       address : wallet.address,
       publicKey : wallet.publicKey,
       privateKey : wallet.privateKey,
       encryptedPrivateKey : EncryptUsingSymmetricKey(hashPassword, wallet.privateKey)
   }
}

const createWalletFromPrivateKey = (privateKey, password) => {
    const projectId = INFURA_ID
    const address = CONTRACT_ADDRESS
    const projectSecret = INFURA_SECRET
    const provider = new ethers.providers.InfuraProvider('rinkeby', {
        projectId,
        projectSecret
    })
    const wallet = new ethers.Wallet(privateKey)
    wallet.connect(provider)
    const hashPassword = Hash256(password)
   return {
       address : wallet.address,
       publicKey : wallet.publicKey,
       privateKey : wallet.privateKey,
       encryptedPrivateKey : EncryptUsingSymmetricKey(hashPassword, wallet.privateKey)
   }
}

module.exports = {
    createWallet, createWalletFromPrivateKey}
