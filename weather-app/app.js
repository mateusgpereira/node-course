const request = require('request')

const url = 'https://api.darksky.net/forecast/ec3dfd2bfc8eaf8ecc8e5145942848ad/37.8267,-122.4233?lang=pt&units=si'

request({url, json: true}, (err, res) => {
    console.log(`${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain.`)
})