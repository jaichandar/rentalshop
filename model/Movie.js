const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('./Genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 1024
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 1024
    }
})

function Validate(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    })
    return schema.validate(movie)
}

const movie = mongoose.model('movie', movieSchema)
exports.Movie = movie;
exports.Validate = Validate;

