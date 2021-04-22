const CryptoJS = require('crypto-js')
const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET } = process.env
const hash256 = require('hash.js')
const { ethers } = require('ethers')
const fs = require('fs')
const { EncryptUsingSymmetricKey, Hash256 } = require('./crypto-utils')
const { create } = require('../models/user')


const PROVIDER = new ethers.providers.InfuraProvider('rinkeby', {
    projectId : INFURA_ID,
    projectSecret : INFURA_SECRET
})
const ABI = JSON.parse(fs.readFileSync('abi.json'))

const createWallet = (password) => {
    const wallet = ethers.Wallet.createRandom().connect(PROVIDER)
   return {
       address : wallet.address,
       publicKey : wallet.publicKey,
       privateKey : wallet.privateKey,
       encryptedPrivateKey : EncryptUsingSymmetricKey(password, wallet.privateKey)
   }
}

const createWalletFromPrivateKey = (privateKey, password) => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
   return {
       address : wallet.address,
       publicKey : wallet.publicKey,
       privateKey : wallet.privateKey,
       encryptedPrivateKey : EncryptUsingSymmetricKey(password, wallet.privateKey)
   }
}
const createWalletFromMnemonic = (mnemonic, password) => {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic).connect(PROVIDER)
    return {
       address : wallet.address,
       publicKey : wallet.publicKey,
       privateKey : wallet.privateKey,
       encryptedPrivateKey : EncryptUsingSymmetricKey(password, wallet.privateKey)
   }
}
const createContract = (privateKey) => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, wallet)
    return contract
}

const getBalance = async (address) => {

    const wallet = createWallet('temp')
    const contract = createContract(wallet.privateKey)
    
    const result = await contract.balanceOf(address)
    const balance = parseInt(result._hex, 16);
    return balance
}

const transferMoney = async (privateKey, transferTo, amount = 1) => {
    const contract = createContract(privateKey)

    const isSuccess = await contract.transfer(transferTo, amount)
    return isSuccess 
}

const mintMoney = async (privateKey, amount=10) => {
    const contract = createContract(privateKey)
    const options = { gasPrice: 1000000000, gasLimit: 85000}
    const isSuccess = await contract.mint(amount, options)
    return isSuccess
}
module.exports = {
    createWallet, createWalletFromPrivateKey, createWalletFromMnemonic,
    getBalance, transferMoney, mintMoney,
}
