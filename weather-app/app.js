const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const search = process.argv[2];

if(search) {
    geocode(search, (error, data) => {
        if(error){
            return console.log(error)
        }
    
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
    
            console.log(data.location)
            console.log(forecastData)
        })
    
    })

} else {
    console.log('Invalid Search, please provide a valid address')
}

