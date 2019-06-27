const request = require('request');
const geo =  require('./geo.js');

const forecast = (location, callback) => {

    geo.geocode(location, (error, data) => {
        if (error) {
            callback(error, undefined);
        } else {
            forecastByCoordinates(data, callback);
        }
    });
};

const forecastByCoordinates = (data, callback) => {

    const {latitude, longitude} = data;

    const url = `https://api.darksky.net/forecast/dde8e21af8b3354c01a4533b4be25d22/${latitude},${longitude}`;
    const params = '?exclude=minutely,hourly&lang=en&units=si'

    const options = {
        url: url + params,
        json: true
    };

    request(options, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather services: ${error}`, undefined);
        } else if (response.body.error) {
            callback(`Error: ${response.body.error} Unable to get weather by longitude: ${ongitude} and latitude: ${latitude}. Try another one`, undefined);
        } else {
            data.temperature = response.body.currently.temperature;
            data.precipProbability = response.body.currently.precipProbability;
            data.summary = response.body.daily.data[0].summary;
            callback(error, data);
        }
    });
};

module.exports = {
    forecast: forecast
};