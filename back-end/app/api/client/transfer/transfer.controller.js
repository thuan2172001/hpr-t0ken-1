const User = require('../../../models/user')
const { CheckAccessToken } = require('../../middleware/auth/auth.mid')

const api = require('express').Router()

api.post('/transfer', CheckAccessToken , async (req, res) => {
    try {
        const { transferTo } = req.body

        const user = await User.findOne({email : req.userInfo})
            if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        const transferFrom = user.wallet
        console.log(transferTo)
        console.log(transferFrom)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

api.get('/transfer', async (req, res) => {
    try {
        const { transferTo } = req.body

        const user = await User.findOne({email : req.userInfo})
            if (!user) throw new Error('TRANSFER.POST.EMAIL_NOT_FOUND')
        const transferFrom = user.wallet
        console.log(transferTo, transferFrom)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = api