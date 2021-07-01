const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('config')
const app = express()

const customer = require('./router/customer')
const genre = require('./router/genre')
const movie = require('./router/movie')
const rental = require('./router/rental')
const register = require('./router/register')
const login = require('./router/login')

if (!config.get('secretKey')) {
    console.error('FATAL ERROR');
    process.exit(1)
}
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/customers', customer)
app.use('/api/genres', genre)
app.use('/api/movies', movie)
app.use('/api/rentals', rental)
app.use('/register', register)
app.use('/login', login)

app.get('*', (req, res) => {
    res.send('rental shop')
})

mongoose.connect('mongodb://localhost:27017/rentalshop', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected'))
    .catch(err => console.log('err in connection'))




const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
