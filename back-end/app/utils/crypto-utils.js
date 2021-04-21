const CryptoJs = require('crypto-js');
const secp256k1 = require('secp256k1');
const bcrypt = require('bcrypt')
const hash256 = require('hash.js');
const { randomBytes, createHash } = require('crypto');
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890abcdef', 10);
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');



const Hash256 = (password) => hash256
        .sha256()
        .update(password)
        .digest('hex')
    
const encryptMD5 = (payload) => {
  const payloadString = JSON.stringify(payload);
  const hashedString = createHash('md5').update(payloadString).digest('hex');
  return hashedString;
};
const EncryptUsingSymmetricKey = (symmetricKey, message) => {
  const encryptedMessage = CryptoJs.AES.encrypt(
    message,
    symmetricKey,
  ).toString();

  return encryptedMessage;
};
const DecryptUsingSymmetricKey = (symmetricKey, encrypted) => {
  const message = CryptoJs.AES.decrypt(
    encrypted,
    symmetricKey,
  ).toString();

  return message;
};

function ConvertBase64ToBuffer(text) {
  return Buffer.from(text, 'base64');
}

function ConvertToString(text) {
  return text.toString('hex');
}

const GenerateAsymmetricKeyPair = () => {
  let privateKey;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));

  const publicKey = secp256k1.publicKeyCreate(privateKey);

  return {
    privateKey: this.ConvertToString(privateKey),
    publicKey: this.ConvertToString(publicKey),
  };
};

const SignMessage = (privateKey, message) => {
  const signature = secp256k1.sign(
    this.ConvertMessage(message),
    this.ConvertBase64ToBuffer(privateKey),
  );

  return { signature: this.ConvertToString(signature.signature) };
};

const base64ToHex = (str) => {
  const raw = ConvertBase64ToBuffer(str);

  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw[i].toString(16);
    result += (hex.length === 2 ? hex : `0${hex}`);
  }
  return result.toUpperCase();
};

function ConvertMessage(obj) {
  const jsonString = JSON.stringify(obj);
  const hashBytes = hash256.sha256().update(jsonString).digest();
  return Buffer.from(hashBytes);
}

const VerifyMessage = (signature, message, publicKey) => {
  console.log(signature, message, publicKey)
  try {
    const hexxx = base64ToHex(signature);
    const key = ec.keyFromPublic(base64ToHex(publicKey), 'hex');
    const messageState = key.verify(Uint8Array.from(ConvertMessage(message)), { r: hexxx.slice(0, 64), s: hexxx.slice(64, 128) });
    return messageState;
  } catch (e) {
    return false;
  }
};

function generateRandomId() {
  return nanoid();
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
  GenerateAsymmetricKeyPair,
  SignMessage,
  VerifyMessage,
  ConvertBase64ToBuffer,
  ConvertMessage,
  ConvertToString,
  encryptMD5,
  generateRandomId,
  ComparePassword,
  HashPassword,
  Hash256,
  DecryptUsingSymmetricKey
};
