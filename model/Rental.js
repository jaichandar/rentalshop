const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 15,
                trim: true
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 1024
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

function validate(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(rental)
}

const rental = mongoose.model('rental', rentalSchema)
exports.Rental = rental;
exports.Validate = validate;
