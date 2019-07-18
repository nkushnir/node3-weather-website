const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nazar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Robot'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'NodeJS'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help. Error 404.',
        errorMessage: 'Help Documentation Not Found!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    forecast.forecast(req.query.address, (error, {temperature, temperatureMin, temperatureMax, precipProbability, location, summary} = {}) => {
        if (error) {
            console.log(error);
            return res.send({error});
        } else {
            return res.send({
                location,
                temperature,
                temperatureMin,
                temperatureMax,
                precipProbability,
                summary
            });
        }
    });

});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page Not Found!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
