const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     // no next() here
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

/*
app.get('/', (req, res) => {
    //res.send('<strong>Hello Express!</strong>');
    res.send({
        name: "Jacques",
        likes: ['apple juce', 'money', 'vacation']
    });
});
*/

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});


app.listen(PORT, () => {
    console.log('Server on ' +PORT);
})