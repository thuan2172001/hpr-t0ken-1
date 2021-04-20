const User = require('../../../../models/user')
// const { error } = require('../../../../services/logger')
// const { success, serverError } = require('../../../../utils/response-utils')
// const { CheckAuth } = require('../../../middleware/auth/auth.mid')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../user.service')
const { badRequest } = require('../../../../utils/response-utils')
const api = require('express').Router()

api.post('/auth/login', async (req, res) => {
    try {
         console.log(req.body)
         const {username, password} = req.body
         console.log(username, password)
         const user = await User.findOne({username})
         console.log(user)
         if (!user) return res.json(badRequest('AUTH.POST.USERNAME_NOT_FOUND'))
         bcrypt.compare(password, user.hashPassword, (err, isMatched) => {
            if (err) return res.json(badRequest(err))

            if (!isMatched) return res.json(badRequest('AUTH.POST.PASSWORD_NOT_MATCH'))

            res.json({user, token: generateAccessToken(username)})
         })
    } catch (err) {
        console.log(err)
    }
})

module.exports = api;