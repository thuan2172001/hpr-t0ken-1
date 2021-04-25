const User = require('../../../../models/user')
const { generateAccessToken } = require('../user.service')
const { BadRequest, Success } = require('../../../../utils/response')
const { ComparePassword } = require('../../../../utils/crypto-utils')

const api = require('express').Router()

api.post('/auth/login', async (req, res) => {
    try {
         const {email, password} = req.body
         const user = await User.findOne({email})
         if (!user) return BadRequest(req, res, err = 'AUTH.POST.EMAIL_NOT_FOUND')
         const isMatched = await ComparePassword(password, user.hashPassword)
         if (!isMatched) return BadRequest(req, res, err = 'AUTH.POST.PASSWORD_WRONG')
         return Success(req, res, {user, token: generateAccessToken(user.email)})
    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
})

module.exports = api;