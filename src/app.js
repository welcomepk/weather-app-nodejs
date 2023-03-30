const express = require('express')
const path = require('path')
const hbs = require('hbs');
const forecast = require('./utils/forecast');
require('dotenv').config()
// creating express app
const app = express();
const port = process.env['PORT'] || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    console.log(req.url);
    res.render('index', {
        title: "Weather 🌤️",
        name: "pramod kamble",

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "Cantact us on pk@contaon.com to get help",
        name: "pramod kamble"

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "pramod kamble"
    })
})

app.get('/weather', (req, res) => {
    if (!('address' in req.query)) {
        return res.send({
            error: "address should must have to be provided .. ",
        })
    }
    const { address } = req.query
    forecast(address, (error, data) => {
        if (error) {
            console.log(error);
            return res.send({
                error
            });
        }
        console.log(data);
        const location = data.location['name'] + ", " + data.location['region'] + " " + data.location['country']
        const { temperature: temp, weather_descriptions, observation_time } = data.current;
        res.send({
            location: location,
            temperature: temp,
            observation_time: observation_time,
            weather_descriptions: weather_descriptions
        })
    })

})

app.get('help/*', (req, res) => {
    res.render('404', {
        title: '',
        message: "there no help for this search",
        name: "pramod kamble"

    })
})

// match anything that not matched above (e.g. "/dsjfd" )
app.get('*', (req, res) => {
    res.render('404', {
        message: "not found 404",
        name: "pramod kamble"
    })
})

app.listen(port, () => {
    console.log("Server is listening on port " + port);
})