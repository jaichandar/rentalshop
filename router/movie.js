const { Movie, Validate } = require('../model/Movie')
const { Genre } = require('../model/Genre')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const movie = await Movie.find().select('-numberInStock')
    res.send(movie)
})

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) {
        return res.status(400).send('genre not found')
    }
    let movie = await new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save()
    res.send(movie)
})

router.put('/:id', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) {
        return res.status(400).send('genre not found')
    }
    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true })
    if (!movie) {
        res.status(400).send('movie not found')
    }
    res.status(200).send(movie)
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) {
        return res.status(400).send('movie not found')
    }
    res.send(movie)
})

module.exports = router;
