const { ethers } = require('ethers')
const fs = require('fs')
// const network = 'https://rinkeby.infura.io/v3/c2dc5f016978440a9b7233c5b8d0a4c5'
const projectId = 'c2dc5f016978440a9b7233c5b8d0a4c5'
const address = '0x0E556F5258130E5C8649aB0c2cA3F523aF8776F2'
const projectSecret = '1ae34e1ff5a140829dafbfbbc0be116c'
// const provider = new ethers.providers.InfuraProvider(network, projectId)
const options = {
    projectId,
    projectSecret
};
// console.log(options);
const provider = new ethers.providers.InfuraProvider('rinkeby', options)



const abi = JSON.parse(fs.readFileSync('abi.json'))
const wallet = ethers.Wallet.createRandom().connect(provider)
const contract = new ethers.Contract(address, abi.abi, wallet)
contract.transfer(wallet.address, 123).then(t => {console.log(t)});
// console.log(contract.interface)
// console.log(wallet)

//  provider.getBlockNumber().then(t =>{
//     console.log(t )
//  });



// contract.connect(signer)
// console.log(contract.address)
// const new_contract = contract.attach(address)
// console.log(wallet.provider)
// console.log(wallet.signMessage(JSON.stringify({name:'Vu'})))
