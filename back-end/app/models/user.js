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
            default: () => '15/2/2000'
        },
        phone: {
            type: String,
            default: () => '0384511222'

        },
        wallet: {
            type: String,
            default: () => createWallet('temp')
        },
        gender: {
            type: Boolean,
            default: () => false
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