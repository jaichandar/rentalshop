const { Genre, Valdiate } = require('../model/Genre')
const express = require('express')
const router = express.Router()
const { Auth } = require('../middleware/auth')
const { Admin } = require('../middleware/admin')

router.get('/', async (req, res) => {
    const genre = await Genre.find()
    res.send(genre)
})

router.post('/', async (req, res) => {
    const { error } = Valdiate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let genre = await new Genre({
        name: req.body.name
    })
    genre = await genre.save()
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    const { error } = Valdiate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })
    if (!genre) {
        return res.status(400).send('genre not found')
    }
    res.send(genre)
})

router.delete('/:id', async (req, res) => {
    let genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) {
        return res.status(400).send('genre not found')
    }
    res.status(200).send(genre)
})




module.exports = router;