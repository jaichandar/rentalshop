const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    isAdmin: Boolean
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('secretKey'))
    return token;
}



function validate(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)
}

const user = mongoose.model('user', userSchema)
exports.User = user;
exports.Validate = validate;

