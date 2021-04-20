require("dotenv").config();
const { SEED_DATA } = process.env;
const generateUser = require('./user')

const seed = async () => {
    if (!SEED_DATA) return;
    await _seed();
};

const _seed = async () => {
    await generateUser()
}
module.exports = seed
