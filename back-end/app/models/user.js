const Mongoose = require('mongoose')
const { createWallet } = require('../utils/wallet')
const { Schema } = Mongoose

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        hashPassword: {
            type: String
        },
        firstName: {
            type: String,
            default: () => 'First'
        },
        lastName: {
            type: String,
            default: () => 'Last'
        },
        birthday: {
            type: Date,
            default: () => new Date('1/1/1999')
        },
        phone: {
            type: String,
            default: () => '038124569625'
        },
        gender : {
            type: Boolean, // false nu, true nam
            default: () => false
        },
        wallet: {
            type: String,
            default: () => createWallet('temp').address
        }
        // encryptedPrivateKey: {
        //     type: String
        // },
        // name: {
        //     type: String
        // }
    }
)
const User = Mongoose.model('user_', UserSchema)
module.exports = User