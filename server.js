//Root file

require('./models/db'); //Request statement for db.js

const express = require('express');
const path = require('path'); //path request to work with, already present
const Handlebars = require('handlebars')
const handlebars = require('express-handlebars');
//template engine, used here instead of angular or react

const bodyparser = require('body-parser');
//converts POST data into request bodies, instead of going to URL
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const control = require('./controllers/control');

var app = express(); //express function

app.use(bodyparser.urlencoded({  
    extended: true
}));
app.use(bodyparser.json()); //converting form data to JSON
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). 
//This object will contain key-value pairs, where the value can be a string or array (when extended is false),
// or any type (when extended is true).

//Express Middleware for Handlebars

//Setting the view directory for app where Handlebar view files will be stored
app.set('views', path.join(__dirname,'/views/')); 
//Configuring Express engine for handlebars
app.engine('hbs',handlebars(
    {   extname:'hbs', //Setting Extension for handlebars
        defaultLayout:'mainLayout', //Wrapper for child views, (Overview)
        layoutsDir: __dirname + '/views/layouts/',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine','hbs'); //Setting View Engine as hbs

app.listen(4000, () =>{   //Starting express server(port, callback)
    console.log('Express server started at port: 4000');
});
app.get('/',(req,res)=>{
    res.redirect('/dashboard')
})
app.use('/dashboard',control); //Use is Middleware Function(Base URI, imported from)