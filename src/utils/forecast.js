
const request = require('postman-request')
require('dotenv').config();
const access_key = process.env.access_key

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${address}`

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather cloud!")
        } else if (response.body.error) {
            callback("Not find any weather info, plz try another search.")
        }
        else {
            const location = response.body.location
            const current = response.body.current
            callback(undefined, {
                // location: {
                //     name: location.name,
                //     lat: location.lat,
                //     lon: location.lon,
                //     localtime: location.localtime
                // },
                // current: {
                //     temp: current.temperature,
                //     obs_time: current.observation_time,
                // }
                location,
                current
            })
        }
    })
}

module.exports = forecast;