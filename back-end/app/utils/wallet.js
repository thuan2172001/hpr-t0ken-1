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

const createWallet = async (password) => {
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

const createContract = (privateKey) => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, wallet)
    return contract
}

const getBalance = async (privateKey, address) => {

    // const _wallet = ethers.Wallet.createRandom().connect(PROVIDER)
    // const _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, _wallet)
    // _contract.name().then(t => console.log(t)).catch(err => console.log(err))

    const wallet = createWallet()
    const contract = createContract(wallet.privateKey)
    
    const balance = await contract.balanceOf(address)
    return balance
}

const transferMoney = async (privateKey, transferTo, amount = 1) => {
    const contract = createContract(privateKey)

    const isSuccess = await contract.transfer(transferTo, amount)
    return isSuccess 
}
module.exports = {
    createWallet, createWalletFromPrivateKey,
    getBalance, transferMoney
}
