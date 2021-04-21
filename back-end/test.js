const {ethers} = require('ethers')
const network = 'https://rinkeby.infura.io/v3/c2dc5f016978440a9b7233c5b8d0a4c5'
const projectId = 'c2dc5f016978440a9b7233c5b8d0a4c5'
const provider = new ethers.providers.InfuraProvider(network, projectId)
console.log(provider)