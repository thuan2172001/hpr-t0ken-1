exports.CommonError = (req, res, err) => {
    return res.json(err.message)
}