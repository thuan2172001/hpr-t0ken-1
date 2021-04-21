// const User = require("../../../models/user");
require("dotenv").config();
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// const getUserByUserName = async (args = {}) => {
//     const validate = (arg = {}) => {
//         const { username } = arg;
//         return username;
//     };

//     const vUserName = validate(args);

//     return User.findOne({ username: vUserName });
// };
// const create = async (args = {}) => {
//     const validateArgs = async (arg = {}) => {
//         const {
//             username,
//             name,
//             publicKey,
//             encryptedPrivateKey,
//         } = arg;

//         // Object.keys(args).forEach((key) => {
//         //     if (_.isNull(args[key]) || args[key] === '') {
//         //         throw new Error(`Property "${key}" empty/null`);
//         //     }
//         // });

//         if (typeof name !== 'string' || (name.length === 0 || name.length > 254)) throw new Error('CREATE.ERROR.USER.NAME_INVALID');

//         if (typeof username !== 'string' || (username.length === 0 || username.length > 254)) throw new Error('CREATE.ERROR.USER.USERNAME_INVALID');
//         const checkUsername = await getUserByUserName({ username })
//         if (checkUsername) throw new Error('CREATE.ERROR.USER.USERNAME_IN_USE');


//         return arg;
//     };
//     const {
//         username,
//         name,
//         publicKey,
//         encryptedPrivateKey
//     } = await validateArgs(args)
//     const newUser = new User({
//         username,
//         name,
//         publicKey: publicKey || 'Au2heWU0aM2sJ2vXJgzuS+ruS/RVe8XH+ysab0qa6yYP',
//         encryptedPrivateKey: encryptedPrivateKey || 'U2FsdGVkX18v0Bp9W+4UBa+oOrmVYANUYNxzmLRka1cWeptOfcYqv4NLgJoisLTIurNVET8F2/sa2JFt8w+52g==',
//     })
//     return newUser.save();
// };

// const update = async (args) => {
//     const { userId } = args
//     if (!userId) throw new Error('UPDATE.ERROR.USER.USER_ID_INVALID')

//     const user = await User.findOne({ _id: userId })
//     if (!user) throw new Error('UPDATE.ERROR.USER.USER_NOT_FOUND')

//     const listField = [
//         'name',
//         'publicKey',
//         'encryptedPrivateKey'
//     ]
//     listField.forEach((fieldName) => {
//         user[fieldName] = args[fieldName] ?? user[fieldName]
//     })

//     return user.save()

// }


// const removeById = async (args) => {
//     const validateArgs = (args) => {
//         const { userId } = args
//         if (!userId) throw new Error('DELETE.ERROR.USER_ID_INVALID')
//         return userId
//     }
//     const vUserId = validateArgs(args)
//     return User.deleteOne({ _id: vUserId })

// }

// const getUserById = async (args) => {
//     const validateArgs = (args) => {
//         const { userId } = args
//         if (!userId) throw new Error('USER.ERROR.USER_ID_INVALID')
//         return userId
//     }
//     const vUserId = validateArgs(args)
//     const user = User.findOne({ _id: vUserId }).select('username name publicKey encryptedPrivateKey')
//     if (!user) throw new Error('USER.ERROR.USER_NOT_FOUND')
//     return user
// }

const generateAccessToken = (email) => {
    return jwt.sign({ email }, TOKEN_SECRET, { expiresIn: '1800s' });
}

// const _update = async (args) => {
//     const salt = await bcrypt.genSalt(10)
//     const {
//         name,
//         password
//     } = args
//     bcrypt.hash(password, salt, async (err, hashPassword) => {
//         if (err) throw new Error(err)

//         return {name, hashPassword}
//     })
// }

module.exports = {
    // create,
    // update,
    // removeById,
    // getUserById,
    // _update
    generateAccessToken

}