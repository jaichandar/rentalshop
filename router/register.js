const { User, Validate } = require('../model/User')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const { Auth } = require('../middleware/auth')


router.get('/', async (req, res) => {
    const user = await User.find().select('-password')
    res.send(user)
})

router.get('/me', Auth, async (req, res) => {
    const user = await User.findById(verified).select('-password')
    res.send(user)
})

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('email already exist')
    }
    //let user = new User({
    //  name:req.body.name,
    //  email:req.body.email,
    //  password:req.body.password  
    //)}
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save()
    res.status(200).send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router;
