const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET } = process.env
const { ethers, BigNumber } = require('ethers')
const fs = require('fs')
const { EncryptUsingSymmetricKey} = require('./crypto-utils')


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
    
    const balance = await contract.balanceOf(address)
    return ethers.utils.formatEther(balance)
}

const transferMoney = async (privateKey, transferTo, amount = 1) => {
    const contract = createContract(privateKey)
    const isSuccess = await contract.transfer(transferTo, ethers.utils.parseUnits(amount))
    return isSuccess 
}

const mintMoney = async (privateKey, amount=1) => {
    const contract = createContract(privateKey)
    const isSuccess = await contract.mint(ethers.utils.parseUnits(amount))
    return isSuccess
}

const getETHBalance = async (privateKey) => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
    const balance = await wallet.getBalance()
    return ethers.utils.formatEther(balance)
}

module.exports = {
    createWallet, createWalletFromPrivateKey, createWalletFromMnemonic,
    getBalance, transferMoney, mintMoney, getETHBalance
}
