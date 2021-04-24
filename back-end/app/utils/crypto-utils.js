const CryptoJS = require('crypto-js');
const { enc } = require('crypto-js');
const bcrypt = require('bcrypt')
const hash256 = require('hash.js');


const Hash256 = (password) => hash256
  .sha256()
  .update(password)
  .digest('hex')

const EncryptUsingSymmetricKey = (string, key = 'temp') => {
  // let encJson = CryptoJS.AES.encrypt(word, key).toString()
  // let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
  // return encData
  return CryptoJS.AES.encrypt(string, key).toString()
};

const DecryptUsingSymmetricKey = (string, key = 'temp' ) => {
  // console.log(typeof word)
  // let decData = CryptoJS.enc.Base64.parse(word).toString()
  // let bytes = CryptoJS.AES.decrypt(decData, key).toString(enc.Utf8)
  // return JSON.parse(bytes)
  return CryptoJS.AES.decrypt(string, key).toString(enc.Utf8);
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
