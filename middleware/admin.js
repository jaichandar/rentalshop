function Admin(req, res, next) {
    if (!verified.isAdmin) {
        return res.status(403).send('access denied')
    }
    next()
}

exports.Admin = Admin