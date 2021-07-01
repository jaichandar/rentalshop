const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        min: 9
    }
})

function Validate(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    })
    return schema.validate(customer)
}

const customer = mongoose.model('customer', customerSchema)
exports.Customer = customer;
exports.Validate = Validate;

