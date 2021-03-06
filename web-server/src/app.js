const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()
const port = process.env.PORT || 3000
 

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Mateus Pereira'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mateus Pereira'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the message!',
        name: 'Mateus Pereira'
    }) 
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    let {address} = req.query

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                console.log(error)
                return res.send({error})
            }

            return res.send({
                address,
                location,
                forecast: forecastData
            })
        })
    })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found!',
        title: 'Help not Found',
        name: 'Mateus Pereira'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Mateus'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}!`)
})

