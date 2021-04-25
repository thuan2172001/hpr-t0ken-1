const User = require("../../../models/user");
const { DecryptUsingSymmetricKey } = require('../../../utils/crypto-utils');
const { Success, BadRequest, Unauthenticated, CommonError } = require("../../../utils/response");
const { getBalance, transferMoney, mintMoney, logTransactions } = require('../../../utils/wallet');
const { CheckAccessToken } = require('../../middleware/auth/auth.mid');
const { generateAccessToken } = require("../user/user.service");

const api = require('express').Router()

api.post('/transfer', CheckAccessToken, async (req, res) => {
    try {
        const { transferTo, privateKeyPassword, amount } = req.body
        const user = await User.findOne({ email:  req.userInfo })
        if (!user) return Unauthenticated(req, res, err = 'TRANSFER.POST.EMAIL_NOT_FOUND')
        const privateKey = DecryptUsingSymmetricKey(user.encryptedPrivateKey, privateKeyPassword)
        if (!privateKey || privateKey === "") throw new Error('TRANSFER.POST.PASSWORD_WRONG')
        const isSuccess = await transferMoney(privateKey, transferTo, amount)
        return Success(req, res, {isSuccess, token : generateAccessToken(user.email)})
    } catch (err) {
        console.log(err)
        return BadRequest(req, res, err.message)
    }
});
api.get('/transfer/balance', CheckAccessToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userInfo })
        if (!user) return Unauthenticated(req, res, err = 'TRANSFER.GET.EMAIL_NOT_FOUND')
        const balance = await getBalance(user.wallet)
        return Success(req, res, {balance, token : generateAccessToken(user.email)})
    } catch (err) {
        console.log(err)
        return BadRequest(req, res, err.message)
    }
});
api.post('/transfer/mint', CheckAccessToken, async (req, res) => {
    try {
        const { privateKeyPassword, amount } = req.body
        const user = await User.findOne({ email: req.userInfo })
        if (!user) return Unauthenticated(req, res, err = 'TRANSFER.POST.EMAIL_NOT_FOUND')
        const privateKey = DecryptUsingSymmetricKey(user.encryptedPrivateKey, privateKeyPassword)
        if (!privateKey || privateKey === "") throw new Error('TRANSFER.POST.PASSWORD_WRONG')
        const isSuccess = await mintMoney(privateKey, amount)
        return Success(req, res, {isSuccess, token : generateAccessToken(user.email)})
    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
});

api.get('/transfer/logs', CheckAccessToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userInfo })
        const qUser = req.query.wallet ? req.query.wallet : undefined
        if (!user) return Unauthenticated(req, res, err = 'TRANSFER.GET.EMAIL_NOT_FOUND')
        const list = await logTransactions(qUser)
        return Success(req, res, {list})
    } catch (err) {
        return BadRequest(req, res, err.message)
    }
});


module.exports = api