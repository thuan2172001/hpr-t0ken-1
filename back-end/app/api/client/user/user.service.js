require("dotenv").config();
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken')


const generateAccessToken = (email) => {
    return jwt.sign({ email }, TOKEN_SECRET, { expiresIn: '18000s' });
}

module.exports = {

    generateAccessToken

}