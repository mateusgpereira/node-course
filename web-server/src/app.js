const path = require('path')
const express = require('express')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()

app.set('view engine', 'hbs')

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Mateus Pereira'
    })

})

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        location: 'Philadelphia',
        forecast: 'It is currently 20º'
    })
})

app.listen(3000, () => {
    console.log("Server is up and running!")
})

