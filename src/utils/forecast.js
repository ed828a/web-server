const request = require('request')
const { getLocation } = require('./geocode')

const forecast = (longtitude, latitude, query_address, callback) => {
    // console.log("latitude: ", latitude)
    // console.log('longtitude: ', longtitude)
    getLocation(longtitude, latitude,  (address) => {
        let temAddress = address
        if(address != query_address) {
            temAddress = query_address
        }
        const forcastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(temAddress)}&appid=14c9028d0ea61cf5e92c9dfa569b0abd`
        // console.log("address: ", address);
        request({url: forcastURL, json: true}, (error, response, body) => {
            if (error) {
                callback("Unable to connect to weather service", undefined)
            } else if (response.statusCode !== 200) {
                callback(body.message, undefined)
            } else {
                const data = {
                    temp: body.list[0].main.temp,
                    feels_like: body.list[0].main.feels_like,
                    description: body.list[0].weather[0].description
                }
                callback(undefined, data)
            }
        });
    });
}


module.exports = forecast