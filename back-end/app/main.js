require('dotenv').config();
const express = require('express')
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const db = require('./database')
const seed = require('./seed-data/seed')

const { MONGODB_DATABASE, MONGODB_PASS, MONGODB_PORT, MONGODB_URL, MONGODB_USER, PORT } = process.env;

module.exports = () => {

    console.log('Bootstrap starting time', new Date());
    // const urlConnection = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
    const urlConnection = 'mongodb://localhost:27017/test'
    // const urlConnection = 'mongodb+srv://admin:admin@cluster0.bra3c.mongodb.net/test?retryWrites=true&w=majority'

    const dbConnect = () => db
        .connect(urlConnection)
        .then(async (msg) => {
            console.log(msg);
            console.log('MongoDB Url: ', urlConnection);
            return seed().then(() => {
                console.log('Seed success!');
            }).catch((e) => {
                console.log('Seed error', e.stack);
            });
        }).catch((err) => {
            console.log(err.message);
            console.log('ERROR DATABASE', err);
            throw err;
        })

    const initApi = () => {
        app.use(cors())
        app.use(bodyParser.json({ limit: '50mb' }))
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use('/api', require('./api'));

    }
    return Promise.all([dbConnect(), initApi()]).then((e) => {
        server.setTimeout(7200000);
        server.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`demo server is listening on port ${PORT}`);
            console.log(new Date());
        });
    }).catch(err => {
        console.log('Something wrong!', err);
    });
}

