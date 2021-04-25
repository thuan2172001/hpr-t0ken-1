const User = require("../../../models/user");
const { CheckAccessToken } = require("../../middleware/auth/auth.mid");
const { ComparePassword, HashPassword, DecryptUsingSymmetricKey } = require("../../../utils/crypto-utils");
const { createWallet, createWalletFromPrivateKey, createWalletFromMnemonic } = require("../../../utils/wallet");
const { BadRequest, CommonError, Success } = require('../../../utils/response');
const { generateAccessToken } = require('./user.service');

const api = require('express').Router()


api.post('/user', async (req, res) => {
    try {
        const data = req.body
        const user = await User.findOne({ email: data.email })
        if (user) return BadRequest(req, res, err = 'USER.POST.EMAIL_CREATED')

        data.hashPassword = await HashPassword(data.password)
        data.privateKeyPassword = data.privateKeyPassword ? data.privateKeyPassword : 'temp'
        if (data.privateKey && data.privateKey !== "") {
            const w = createWalletFromPrivateKey(data.privateKey, data.privateKeyPassword)
            const { address, encryptedPrivateKey } = w
            const user = new User({ ...data, wallet: address, encryptedPrivateKey })
            const info = await user.save()
            return Success(req, res, {user : info})
        }
        if (data.mnemonic && data.mnemonic !== "") {
            const w = createWalletFromMnemonic(data.mnemonic, data.privateKeyPassword)
            const { address, encryptedPrivateKey } = w
            const user = new User({ ...data, wallet: address, encryptedPrivateKey })
            const info = await user.save()
            return Success(req, res, {user : info})
        }

        const w = createWallet(data.privateKeyPassword)
        const { address, encryptedPrivateKey } = w
        const user_ = new User({ ...data, wallet: address, encryptedPrivateKey })
        const info = await user_.save()
        return Success(req, res, {user : info})

    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
});


api.get('/user', CheckAccessToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userInfo })
        if (!user) return Unauthenticated(req, res, err = 'USER.GET.EMAIL_NOT_FOUND')
        return Success(req, res, {user, token : generateAccessToken(user.email)})
    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
})

api.put('/user/:userId', CheckAccessToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        if (!user || user.email != req.userInfo) return BadRequest(req, res, err = 'USER.PUT.BAD_REQUEST')
        const args = req.body
        const { password, old_password } = args
        if (old_password && password) {
            const isMatch = await ComparePassword(old_password, user.hashPassword)
            if (!isMatch) return BadRequest(req, res, err = 'USER.PUT.PASSWORD_WRONG')
            const new_hashPassword = await HashPassword(password)
            user['hashPassword'] = new_hashPassword ?? user['hashPassword']
        }
        const listField = ['firstName', 'lastName', 'gender', 'phone']
        listField.forEach((field) => {
            user[field] = args[field] ?? user[field]
        })
        const status = await user.save()
        return Success(req, res, {user : status, token : generateAccessToken(user.email)})

    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
})

api.post('/user/privateKey', CheckAccessToken, async (req, res) => {
    try {
        const { privateKeyPassword } = req.body
        const user = await User.findOne({ email: req.userInfo })
        if (!user) return Unauthenticated(req, res, err = 'USER.GET.EMAIL_NOT_FOUND')
        const privateKey = DecryptUsingSymmetricKey(user.encryptedPrivateKey, privateKeyPassword)
        if (privateKey === "" || !privateKey) return BadRequest(req, res, err = 'USER.POST.PASSWORD_WRONG')
        return res.json({ privateKey, token : generateAccessToken(user.email) })
    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
})


module.exports = api