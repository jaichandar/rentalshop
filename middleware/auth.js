const jwt = require('jsonwebtoken')
const config = require('config')

function Auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send('access denied')
    }

    try {
        const verify = jwt.verify(token, config.get('secretKey'))
        verified = verify;
        next()
    } catch (err) {
        res.send(err)
    }
}

exports.Auth = Auth;
