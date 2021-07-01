const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')
const { Rental, Validate } = require('../model/Rental')
const { Customer } = require('../model/Customer')
const { Movie } = require('../model/Movie')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rental = await Rental.find().select('-dailyRentalRate')
    res.send(rental)
})

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findById(req.body.customerId)
    if (!customer) {
        return res.status(400).send('customer not found')
    }
    const movie = await Movie.findById(req.body.movieId)
    if (!movie) {
        return res.status(400).send('movie not found')
    }
    if (movie.numberInStock === 0) {
        return res.status(400).send('movie not in stock')
    }

    let rental = await new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()
    } catch (err) {
        res.status(400).send(err)
    }
    res.send(rental)
})

module.exports = router;