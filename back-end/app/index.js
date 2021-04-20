const main = require('./main')

main()
    .catch(e => {
        console.log(e)
        process.exit(1)
    })