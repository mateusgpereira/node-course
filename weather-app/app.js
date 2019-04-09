const request = require('request')

// const url = 'https://api.darksky.net/forecast/ec3dfd2bfc8eaf8ecc8e5145942848ad/37.8267,-122.4233?lang=pt&units=si'

// request({url, json: true}, (err, res) => {
//     console.log(`${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain.`)
// })




const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWF0ZXVzLXBlcmVpcmEiLCJhIjoiY2pxbXVpZ29jMDFraDN4cGJnNWZ4anRpcyJ9.1OVBwXPLTNemyRqS8eT8lg&cachebuster=1553632987678&autocomplete=true&limit=1'

request({url: urlMap, json: true}, (err, res) => {
    if(err) {
        console.log('Unable to connect!')

    } else if(res.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')

    } else {
        console.log(`Longitude: ${res.body.features[0].center[0]} \nLatitude: ${res.body.features[0].center[1]}`)

    }
    
})