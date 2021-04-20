const secp256k1 = require('secp256k1');
const CryptoJS = require('crypto-js')
const { randomBytes } = require('crypto')
const btoa = require('btoa')
const atob = require('atob')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const hash256 = require('hash.js');

const CERTIFICATE_EXP = 1000 * 60 * 60;

const SignMessage = (privateKey, message) => {
    // console.log('----messsage123', convertMessage(message));
    const signature = secp256k1.ecdsaSign(
        ConvertMessage(message),
        convertStringToByteArray(privateKey),
    );
    return convertArrayBufferToString(signature.signature);
};

const ConvertMessage = (obj) => {
    const jsonString = JSON.stringify(obj);
    const hashBytes = hash256
        .sha256()
        .update(jsonString)
        .digest();
    return Uint8Array.from(hashBytes);
};

const GenerateCertificate = (
    certificateInfo,
    privateKey,
) => {
    const keyPair = GenerateKeyPair(privateKey);
    const signature = SignMessage(privateKey, certificateInfo);
    return { signature, certificateInfo, publicKey: keyPair.publicKey };
};



const convertArrayBufferToString = (arrayBuffer) => {
    let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return base64String;
};
const convertStringToByteArray = (base64_string) => {
    return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0));
};

const SymmetricDecrypt = (
    cipherText,
    key,
) => {
    const cipher = CryptoJS.AES.decrypt(cipherText, key);
    const cipherUtf8 = cipher.toString(CryptoJS.enc.Utf8); // WordArray object

    return cipherUtf8;
    //   return cipher.toString();
};
const GenerateKeyPair = (
    privateKey,
) => {
    let pK;
    if (privateKey && typeof privateKey == 'string') {
        pK = convertStringToByteArray(privateKey);
    } else {
        console.log("create new pk")
        do {
            pK = randomBytes(32);
        } while (!secp256k1.privateKeyVerify(pK));
    }
    const publicKey = secp256k1.publicKeyCreate(pK);
    return {
        privateKey: convertArrayBufferToString(pK),
        publicKey: convertArrayBufferToString(publicKey),
    };
};
const SymmetricEncrypt = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
};
const GenerateKeyPairAndEncrypt = (
    password
) => {
    const { privateKey, publicKey } = GenerateKeyPair(null);
    const encryptedPrivateKey = SymmetricEncrypt(privateKey, password);
    return { publicKey, privateKey, encryptedPrivateKey };
};



function ConvertBase64ToBuffer(text) {
    return Buffer.from(text, 'base64');
}
const base64ToHex = (str) => {
    const raw = ConvertBase64ToBuffer(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
        const hex = raw[i].toString(16);
        result += (hex.length === 2 ? hex : `0${hex}`);
    }
    return result.toUpperCase();
};
const VerifyMessage = (signature, message, publicKey) => {
    try {
        const hexxx = base64ToHex(signature);
        const key = ec.keyFromPublic(base64ToHex(publicKey), 'hex');
        const messageState = key.verify(Uint8Array.from(ConvertMessage(message)), { r: hexxx.slice(0, 64), s: hexxx.slice(64, 128) });
        return messageState;
    } catch (e) {
        console.log(e)
        return false;
    }
};

const fakeReq = (username, pw, encryptedPrivateKey, body) => {
    const privateKey = SymmetricDecrypt(encryptedPrivateKey, pw)
    const certificateInfo = { username, timestamp: new Date(), exp: CERTIFICATE_EXP }
    // const bodyString = JSON.stringify(body)
    const keyPair = GenerateKeyPair(privateKey)
    const signature = SignMessage(privateKey, body);
    return {
        authorization: JSON.stringify({
            certificateInfo,
            publicKey: keyPair.publicKey,
            signature
        }),
        body: JSON.stringify(body)
    }
}
const fakePingReq = (username, pw, encryptedPrivateKey) => {
    const privateKey = SymmetricDecrypt(encryptedPrivateKey, pw)
    const certificate = { username, timestamp: new Date(), exp: CERTIFICATE_EXP }
    const certificateInfo = GenerateCertificate(certificate, privateKey)
    return {
        headers: JSON.stringify(certificateInfo),
        body: JSON.stringify(certificateInfo)
    }

}
const _publicKey = "ApO2r0I7JV3HrXDFF8A5jpfQFGNM2vP/+V+iJXsWkYoU"
const _encryptedPrivateKey = "U2FsdGVkX1804h8Rc2jF3PH3gtIR/vYBjCtSaRH60LDILLxEf9+VvfbQUy0Ct+YIvpFTSKWo/Z26q/T2qJNPug=="
const _password = "anh123"
const _username = "student1@gmail.com"
const _id = "607af924b4d8513a90c542e4"
// console.log(GenerateKeyPairAndEncrypt(password=_password))


// const req = fakeReq(username = _username,
//     pw = "temp",
//     encryptedPrivateKey = _encryptedPrivateKey,
//     body = {
//         "name": "Vu2"
//     }
// )

// console.log(req)
// console.log("Create fake req\n", req)



console.log(fakePingReq(username = _username,
    pw = _password,
    encryptedPrivateKey = _encryptedPrivateKey))

// const req = fakeReq(
//     username = _username,
//     pw = _password,
//     encryptedPrivateKey = _encryptedPrivateKey,
//     body = {
//         "publicKey": "ApO2r0I7JV3HrXDFF8A5jpfQFGNM2vP/+V+iJXsWkYoU",
//         "encryptedPrivateKey" : "U2FsdGVkX1804h8Rc2jF3PH3gtIR/vYBjCtSaRH60LDILLxEf9+VvfbQUy0Ct+YIvpFTSKWo/Z26q/T2qJNPug=="
//     }
// )
// console.log(req)