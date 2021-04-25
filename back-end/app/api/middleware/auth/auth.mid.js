const {TOKEN_SECRET} = process.env
const jwt = require("jsonwebtoken");
const { Unauthenticated, CommonError } = require("../../../utils/response");

const CheckAccessToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization.split(' ')[1]
        if (!auth || auth === '') return Unauthenticated(req, res, err = 'AUTH.MISSING_ACCESS_TOKEN')
        jwt.verify(auth, TOKEN_SECRET, (err, data) => {
            if (err) throw new Error(err)
            req.userInfo = data.email
            return next()
        })
    } catch (err) {
        console.log(err)
        return CommonError(req, res, err.message)
    }
}
module.exports = {
    CheckAccessToken
}