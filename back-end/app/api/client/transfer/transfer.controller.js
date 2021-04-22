
const User = require("../../../models/user");
const { DecryptUsingSymmetricKey } = require('../../../utils/crypto-utils');
const { getBalance, transferMoney, mintMoney } = require('../../../utils/wallet');
const { CheckAccessToken } = require('../../middleware/auth/auth.mid');

const api = require('express').Router()

api.post('/transfer', CheckAccessToken, async (req, res) => {
    try {
        const { transferTo, privateKeyPassword, amount } = req.body
        const user = await User.findOne({ email:  req.userInfo })
        if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        const privateKey = DecryptUsingSymmetricKey(user.encryptedPrivateKey, privateKeyPassword)
        if (!privateKey || privateKey === "") throw new Error('TRANSFER.POST.PASSWORD_WRONG')
        const isSuccess = await transferMoney(privateKey, transferTo, amount)
        return res.json(isSuccess)
    } catch (err) {
        console.log(err)
        return res.json(err.message)
    }
});
api.get('/transfer/balance', CheckAccessToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userInfo })
        if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        const balance = await getBalance(user.wallet)
        res.json({balance})
    } catch (err) {
        console.log(err)
    }
});
api.post('/transfer/mint', CheckAccessToken, async (req, res) => {
    try {
        const { privateKeyPassword, amount } = req.body
        const user = await User.findOne({ email: req.userInfo })
        if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        const privateKey = DecryptUsingSymmetricKey(privateKeyPassword, user.encryptedPrivateKey)
        if (!privateKey || privateKey === "") throw new Error('TRANSFER.POST.PASSWORD_WRONG')
        const isSuccess = await mintMoney(privateKey, amount)
        res.json({isSuccess})
    } catch (err) {
        console.log(err)
    }
});




module.exports = api