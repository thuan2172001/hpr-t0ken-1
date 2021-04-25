require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const { INFURA_ACCESS_TOKEN, MNEMONIC } = process.env

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      gasLimit: 6000000000,
      defaultBalanceEther: '100',
    },
    tomotestnet: {
      url: 'https://testnet.tomochain.com',
      gas: 3000000,
      gasPrice: 10000000000000,
      accounts: {
        mnemonic: MNEMONIC,
        initialIndex: 0,
        count: 1,
        path: "m/44'/60'/0'/0",
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/90b168bfe79e4444b277a5d358ca0d62`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  gas: 40000000,
  gasPrice: 10000000000,
  mocha: {
    timeout: 100000,
  },
}
