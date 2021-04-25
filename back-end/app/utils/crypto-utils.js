const CryptoJS = require('crypto-js');
const { enc } = require('crypto-js');
const bcrypt = require('bcrypt')
const hash256 = require('hash.js');


const Hash256 = (password) => hash256
  .sha256()
  .update(password)
  .digest('hex')

const EncryptUsingSymmetricKey = (string, key = 'temp') => {
  try {
    const encrypted = CryptoJS.AES.encrypt(string, key).toString()
    return encrypted
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
   
};

const DecryptUsingSymmetricKey = (string, key = 'temp' ) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(string, key).toString(enc.Utf8)
    return decrypted
  } catch (err) {
    console.log(err)
    return ""
  }
}



const HashPassword = (password) => new Promise(async (res, rej) => {
  const salt = await bcrypt.genSalt(10)
  bcrypt.hash(password, salt, async (err, encrypted) => {
    if (err) rej(err)
    res(encrypted)
  })
})

const ComparePassword = (password, hashPassword) => new Promise((res, rej) => {
  bcrypt.compare(password, hashPassword, (err, isMatch) => {
    if (err) rej(err)
    res(isMatch)
  })
})

module.exports = {
  EncryptUsingSymmetricKey,
  ComparePassword,
  HashPassword,
  Hash256,
  DecryptUsingSymmetricKey
};
