const path = require('path')
const express = require('express')
const hbs = require('hbs')
const textMessage = require('./constants')
const { geocode } = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()

// set up static directory to serve (server working directory)
app.use(express.static(path.join(__dirname, '../public')))

// setting hbs as view engine with a customized views path  
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, './templates/views')
app.set('views', viewsPath)

// configure partials
const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

// Routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Edward Ali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: textMessage,
        title: 'help',
        name: 'Edward Ali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Edward Ali'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address.'
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
 
        const { latitude, longtitude, location } = data
        forcast(longtitude, latitude, req.query.address, (error, data) => { 
            if (error) {
                return res.send({error: 'forecast Error' })
            }

            const { temp, feels_like, description } = data;
            return res.send({
                forecast: description,
                temperature: (temp - 273.15).toFixed(2),
                feels_like: (feels_like - 273.15).toFixed(2),
                address: req.query.address,
                location: location
            });
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})





// 404 page
// wildcard * means match anything, 
// at this position means it match anything what hasn't been matched so far
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Edward Ali',
        messageText: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Edward Ali',
        messageText: 'Page not found'
    })
})

app.listen(3001, () => {
    console.log('The server is running up now')
})

