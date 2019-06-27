const request = require('request');

const geocode = (location, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibmFzYXIyMDA1IiwiYSI6ImNqd3ZrazdncDA5NGc0NG8yZ2tpYjc0MHMifQ.Ksyiyp5WK7Edv8LviswGmg`;
    const params = '&limit=1&language=en';

    const mapboxOptions = {
        url: url + params,
        json: true
    };

    request(mapboxOptions, (error, {body}) => { // using Object destructuring here: instead of response
        if (error) {
            callback(`Unable to connect to location services: ${error}`, undefined);
        } else if (body.features.length === 0) {
            callback(`Unable to find location ${location}. Try another search`, undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = {
    geocode: geocode
};