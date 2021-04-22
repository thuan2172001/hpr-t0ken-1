const main = require('./app/main')

main()
    .catch(e => {
        console.log(e)
        process.exit(1)
    })