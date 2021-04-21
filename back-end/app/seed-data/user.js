const User = require('../models/user')
const { getCSVFiles, getContentCSVFiles, cleanField } = require('./scanData');
const Promise = require('bluebird');
const { HashPassword, Hash256 } = require('../utils/crypto-utils');
const { createWallet } = require('../utils/wallet');
const generateUser = async () => {
  try {
    const userFile = await getCSVFiles('user');
    const { header, content } = await getContentCSVFiles(userFile[0]);
    await Promise.each(content, async (line) => {
      const data = {}
      const field = cleanField(line.split(','));
      await header.forEach(headerName => { data[headerName] = field[header.indexOf(headerName)] })

      const checkDataExits = await User.findOne({ email: data.email });
      if (!checkDataExits) {
        data.hashPassword = await HashPassword('temp')

        if (data.wallet) {
          const wallet = await createWalletFrom(data.wallet, Hash256(data.wallet_password))
          data.wallet = wallet.address
        }
        const user = new User(data);

        await user.save();
      }
    });
    console.log('Seed User Success');
  } catch (err) {
    console.log(err)
    throw new Error(err.message);
  }
};

module.exports = generateUser