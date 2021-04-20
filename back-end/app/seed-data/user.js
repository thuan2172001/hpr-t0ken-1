const User = require('../models/user')
const { getCSVFiles, getContentCSVFiles, cleanField } = require('./scanData');
const Promise = require('bluebird');
const generateUser = async () => {
  try {
    const userFile = await getCSVFiles('user');
    const { header, content } = await getContentCSVFiles(userFile[0]);

    await Promise.each(content, async (line) => {
      const field = cleanField(line.split(','));
      const username = field[header.indexOf('username')];
      const email = `${username}@gmail.com`
      const checkDataExits = await User.findOne({
        username: email,
      });
      if (!checkDataExits) {
        const user = new User({
          username: email,
          publicKey: 'A1UJhC4fXmjQ+UB15BnxZ5ei8rEku0X5U5lbMuxPesvC',
          encryptedPrivateKey:
                        'U2FsdGVkX1+hWx8OmeQtx/XXtzeACOo0r+ZuJABbSXFPaHcHwOhD4uowUu4QssA/R7r1cQXNl8WbnFb0yJeG9g==',
        });
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