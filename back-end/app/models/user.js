const Mongoose = require('mongoose')
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
            type: String
        },
        lastName: {
            type: String
        },
        birthday: {
            type: Date
        },
        phone: {
            type: String
        },
        wallet: {
            type: String
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