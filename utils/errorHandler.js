module.exports = (res, error) => {
    res.status(500).json({
        messege: error.message ? error.message : error
    })
}