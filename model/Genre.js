const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})

function validate(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

const genre = mongoose.model('genre', genreSchema)
exports.Genre = genre;
exports.Valdiate = validate;
exports.genreSchema = genreSchema;

