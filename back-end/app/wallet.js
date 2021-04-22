const {ethers} = require('ethers')
const {INFURA_ID, INFURA_SECRET} = process.env
const provider = new ethers.providers.InfuraProvider('rinkeby', {
    projectId : INFURA_ID,
    projectSecret: INFURA_SECRET
})

const createNewWallet = () => {
    const wallet = ethers.Wallet.createRandom().connect(provider)
    const {publicKey, privateKey, address} = wallet
    
}