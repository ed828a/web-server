const request = require('request')

// this function is just convert address to coordinates, 
// callback decide how to deal with the coordinates.
// callback also handle the error
const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWQ4MjhhIiwiYSI6ImNqd3VteWRxcDBoN3EzenBlZ3J4NWVzeHAifQ.5DT42ZDt1h1wzoCeecl45g&limit=1&language=en`

    request({ url: geocodeURL, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find the location, Try another search", undefined)
        } else {
            const data = {
                latitude: body.features[0].geometry.coordinates[1],
                longtitude: body.features[0].geometry.coordinates[0],
                location:  body.features[0].place_name
            }
            callback(undefined, data) 
        }
    });
}

const getLocation = ( longtitude, latitude, callback) => {
    // console.log('getLocation: longtitude: ', longtitude)
    // console.log('getLocation: latitude: ', latitude)
    // console.log(`${longtitude},${latitude}`)
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longtitude)},${encodeURIComponent(latitude)}.json?access_token=pk.eyJ1IjoiZWQ4MjhhIiwiYSI6ImNqd3VteWRxcDBoN3EzenBlZ3J4NWVzeHAifQ.5DT42ZDt1h1wzoCeecl45g`
    // console.log("geoCodeURL: ", geoCodeURL) 
    request({url: geoCodeURL, json: true}, (error, response, body) =>{
        if(response.statusCode === 200 && body.features.length){
            const placeName = body.features[1].place_name;
            callback(placeName)
            // console.log(body.features[1])
        }
    });
}
module.exports = { geocode, getLocation }