const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/ec3dfd2bfc8eaf8ecc8e5145942848ad/${lat},${long}?lang=en&units=si`
   
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another coordinates', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)

        }
    })
}

module.exports = forecast