

const { CheckAccessToken } = require("../../middleware/auth/auth.mid");
const bcrypt = require('bcrypt')
const User = require("../../../models/user");
const { ComparePassword, HashPassword } = require("../../../utils/crypto-utils");
const { badRequest } = require("../../../utils/response-utils");
const { createWalletFromPrivateKey } = require("../../../utils/wallet");

const api = require('express').Router()


api.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const args = req.body
        const user = await User.findOne({ email: args.email })
        if (user) return res.json(badRequest("USER.POST.EMAIL_CREATED"))
        bcrypt.hash(args.password, salt, async (err, encrypted) => {
            if (err) return res.json(badRequest(err.message))
            args.hashPassword = encrypted
            if (args.privateKey) {
                const wallet = await createWalletFromPrivateKey(args.privateKey, 'temp')
                args.wallet = wallet.address
            }
            const new_user = new User(args)
            const info = await new_user.save()
            res.json(info)
        })
    } catch (err) {
        console.log(err)
    }
});


api.get('/user', CheckAccessToken, async (req, res) => {
    try {
        const { userInfo } = req
        const user = await User.findOne({ email: userInfo })
        if (!user) throw new Error('USER.GET.EMAIL_NOT_FOUND')
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json(err.message)
    }
})

api.put('/user/:userId', CheckAccessToken, async (req, res) => {
    try {
        const { userInfo } = req
        const { userId } = req.params
        const user = await User.findOne({ _id: userId })

        if (!user || user.email != userInfo) throw new Error('USER.PUT.BAD_REQUEST')

        const args = req.body
        console.log(args)
        const { password, old_password } = args
        if (old_password && password) {
            const isMatch = await ComparePassword(old_password, user.hashPassword)
            if (!isMatch) throw new Error('USER.PUT.PASSWORD_WRONG')
            const new_hashPassword = await HashPassword(password)
            user['hashPassword'] = new_hashPassword ?? user['hashPassword']
        }

        const listField = ['firstName' ,'lastName', 'gender', 'phone']
        listField.forEach((field) => {
            user[field] = args.user[field] ?? user[field]
        })
        console.log(user)
        const status = await user.save()
        return res.json(status)

    } catch (err) {
        console.log(err)
        res.json(err.message) 
    }
})

// api.delete('/user/:userId', CheckAuth, async (req, res) => {
//     try {
//         const { userId } = req.params
//         const result = removeById({ userId })
//         return success(result)
//     } catch (err) {
//         return CommonError(req, res, err)
//     }
// })
// api.get('/user/:userId', CheckAuth, async (req, res) => {
//     try {
//         const { userId } = req.params
//         const result = await getUserById({ userId })
//         return res.json(success(result))
//     } catch (err) {
//         return CommonError(req, res, err)
//     }
// })
module.exports = api