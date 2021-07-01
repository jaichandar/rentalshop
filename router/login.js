const { User } = require('../model/User')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const { Auth } = require('../middleware/auth')


router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('invalid email/password')
    }
    const hashedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!hashedPassword) {
        return res.status(400).send('invalid email/password')
    }
    const token = user.generateToken()
    res.header('x-auth-token', token).send(token)
})




function Validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)
}





module.exports = router;
