const { Customer, Validate } = require('../model/Customer')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const customer = await Customer.find()
    res.send(customer)
})

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let customer = await Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true })

    if (!customer) {
        return res.status(400).send('customer not found')
    }

    customer = await customer.save()
    res.send(customer)
})

router.delete('/:id', async (req, res) => {
    let customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) {
        return res.status(400).send('customer not found')
    }
    res.status(200).send(customer)
})

module.exports = router;