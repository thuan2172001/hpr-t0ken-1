
const bcrypt = require('bcrypt')
const User = require("../../../models/user");
const { createWallet, createContract, getBalance, transferMoney } = require('../../../utils/wallet');
const { CheckAccessToken } = require('../../middleware/auth/auth.mid');

const api = require('express').Router()

api.post('/transfer', CheckAccessToken, async (req, res) => {
    try {
        const email = req.userInfo
        const { transferTo, privateKey } = req.body
        const user = await User.findOne({ email: email })
        if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        console.log(user.wallet)
        const isSuccess = await transferMoney(privateKey, transferTo)
        return res.json(isSuccess)
    } catch (err) {
        console.log(err)
    }
});
api.get('/transfer/balance', CheckAccessToken, async (req, res) => {
    try {
        const email = req.userInfo
        const user = await User.findOne({ email: email })
        console.log(user)
        console.log(req.userInfo)
        if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        // const balance = await getBalance(user.wallet)
        res.json(20)
    } catch (err) {
        console.log(err)
    }
});


module.exports = api