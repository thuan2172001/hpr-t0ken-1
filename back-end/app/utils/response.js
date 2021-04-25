
const CommonError = (req, res, err) => {
    return res.status(500).json(err.message)
}

// Response 4xx
const BadRequest = (req, res, err) => {
    return res.status(400).json(err.message)
}

const Unauthenticated = (req, res, err) => {
    return res.status(401).json(err.message)
}

const NotFound = (req, res, err) => {
    return res.status(404)
}

// Response 2xx
const Success = (req, res, data) => {
    return res.status(200).json(data)
}

const Created = (req, res, data) => {
    return res.status(201).json(data)
}


module.exports = {CommonError, BadRequest, Unauthenticated, NotFound, Success, Created}