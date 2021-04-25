
const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET } = process.env
const { ethers } = require('ethers')
const fs = require('fs')
const { EncryptUsingSymmetricKey } = require('./crypto-utils')


const PROVIDER = new ethers.providers.InfuraProvider('rinkeby', {
    projectId: INFURA_ID,
    projectSecret: INFURA_SECRET
})
const ABI = JSON.parse(fs.readFileSync('abi.json')).abi
const CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI)

const createWallet = (password = 'temp') => {
    const wallet = ethers.Wallet.createRandom().connect(PROVIDER)
    return {
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        encryptedPrivateKey: EncryptUsingSymmetricKey(wallet.privateKey, password)
    }
}

const createWalletFromPrivateKey = (privateKey, password = 'temp') => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
    return {
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        encryptedPrivateKey: EncryptUsingSymmetricKey(wallet.privateKey, password)
    }
}
const createWalletFromMnemonic = (mnemonic, password = 'temp') => {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic).connect(PROVIDER)
    return {
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        encryptedPrivateKey: EncryptUsingSymmetricKey(wallet.privateKey, password)
    }
}
const createContract = (privateKey) => {
    const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
    const contract = CONTRACT.connect(wallet)
    return contract
}

const getBalance = async (address) => {
    try {
        const contract = CONTRACT.connect(PROVIDER)
        const balance = await contract.balanceOf(address)
        return ethers.utils.formatEther(balance)
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

const transferMoney = async (privateKey, transferTo, amount = 1) => {
    try {
        const contract = createContract(privateKey)
        console.log(ethers.utils.parseUnits(amount))
        console.log({ transferTo, amount: ethers.utils.parseUnits(amount) })
        const isSuccess = await contract.transfer(transferTo, ethers.utils.parseUnits(amount))
        console.log(isSuccess)
        return isSuccess
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

const mintMoney = async (privateKey, amount = 1) => {
    try {
        const contract = createContract(privateKey)
        const isSuccess = await contract.mint(ethers.utils.parseUnits(amount))
        return isSuccess
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }

}

const getETHBalance = async (privateKey) => {
    try {
        const wallet = new ethers.Wallet(privateKey).connect(PROVIDER)
        const balance = await wallet.getBalance()
        return ethers.utils.formatEther(balance)
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}


const handleTransaction = ({ event, args, transactionHash }) => {
    try {
        var { from, to, value } = args
        if (value) value = ethers.utils.formatEther(value)
        return { transactionHash, event, from, to, value }
    } catch (err) {
        throw new Error(err.message)
    }

}
const logTransactions = async (address = undefined) => {
    try {
        const logs = await CONTRACT.connect(PROVIDER).queryFilter(['Transfer(address,address,uint256)', 'Approval(address,address,uint256)'])
        if (!logs) throw new Error('LOG_FAIL')
        if (address) {
            return logs.map(log => handleTransaction(log)).filter(log => (address === log.from || address === log.to))
        }
        return logs.map(log => handleTransaction(log))
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}
module.exports = {
    createWallet, createWalletFromPrivateKey, createWalletFromMnemonic,
    getBalance, transferMoney, mintMoney, getETHBalance,
    logTransactions
}
