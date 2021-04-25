const { ethers } = require('ethers')
const fs = require('fs')
const { DecryptUsingSymmetricKey, EncryptUsingSymmetricKey } = require('./app/utils/crypto-utils')

require('dotenv').config()

// const { INFURA_ID, CONTRACT_ADDRESS, INFURA_SECRET, MNEMONIC } = process.env
// const options = {
//   INFURA_ID,
//   INFURA_SECRET,
// }

// const provider = new ethers.providers.InfuraProvider('rinkeby', options)
// const abi = JSON.parse(fs.readFileSync('abi.json'))

// const adminWallet = new ethers.Wallet("0xaa30e816d1dfb91e70b259711f39a63b310a0e10a47e11b0e1f900c7e20a7ab6").connect(provider)
// const wallet = new ethers.Wallet.createRandom().connect(provider)

// console.log(adminWallet.privateKey);

// adminWallet.getBalance().then(r => console.log(ethers.utils.formatEther(r)))

// const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, adminWallet)

// contract.balanceOf("0xe15700E8193929F9dE0cD594DabBFeea29ebfAdc").then(r => console.log(r.toString()))

// contract.transfer("0xe15700E8193929F9dE0cD594DabBFeea29ebfAdc", "1000000000000000000000").then(r => console.log(r.toString()))

// console.log(balance)
// U2FsdGVkX19yWrzJz0t7nUe0zGGR5gx4a8vMsO76QyDvYc2l3Lay6k8lf+YS1KqSWazr5TE8JsF2YXL/REQXSou2Z3V6owFt5Xj1JcSkzt8bLqTynSJCIy2rKTh83qV8
// console.log(DecryptUsingSymmetricKey("password", "U2FsdGVkX19yWrzJz0t7nUe0zGGR5gx4a8vMsO76QyDvYc2l3Lay6k8lf+YS1KqSWazr5TE8JsF2YXL/REQXSou2Z3V6owFt5Xj1JcSkzt8bLqTynSJCIy2rKTh83qV8"))

const encrypted = EncryptUsingSymmetricKey('temp')
console.log(typeof encrypted)
const decrypted = DecryptUsingSymmetricKey('VTJGc2RHVmtYMSswVmoreEJnUEJmRVRFbVo1NkFpVGRQM1Jac0cydEREQkRTYVBqZWNjRmNOMUN2OFdmLzdJTE5TREVycnp2Q2NUcDRYNWFqbEo2UHZIQlNsclhITmVxTVRlSTZRVVU5cnliczNYMzZMdWdUNEJYY0E2NDBLRFU=', 'vu19102001')
console.log(decrypted)
