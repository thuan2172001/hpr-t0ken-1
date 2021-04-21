
// const { CommonError } = require("../../../utils/error");
// const { success } = require("../../../utils/response-utils");
const { CheckAccessToken } = require("../../middleware/auth/auth.mid");
const bcrypt = require('bcrypt')
// const { update, removeById, getUserById, _update } = require("./user.service");
const User = require("../../../models/user");
const { ComparePassword, HashPassword } = require("../../../utils/crypto-utils");
const { badRequest } = require("../../../utils/response-utils");

const api = require('express').Router()


api.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) return res.json(badRequest("USER.POST.EMAIL_CREATED"))
        bcrypt.hash(password, salt, async (err, encrypted) => {
            if (err) return res.json(badRequest(err.message))

            const new_user = new User({ email, hashPassword: encrypted })
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
        console.log(userInfo)
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
        const { password, old_password } = args
        if (old_password && password) {
            const isMatch = await ComparePassword(old_password, user.hashPassword)
            if (!isMatch) throw new Error('USER.PUT.PASSWORD_WRONG')
            const new_hashPassword = await HashPassword(password)
            user['hashPassword'] = new_hashPassword ?? user['hashPassword']
        }
        const listField = ['name']
        listField.forEach((field) => {
            user[field] = args[field] ?? user[field]
        })
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