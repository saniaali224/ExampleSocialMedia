"use strict";
const express = require('express');
const endpoints = require('./routes');
const mongoose = require('mongoose');
const config = require('./config/index');

// Set up port for server to listen on
let port = process.env.PORT || 8200;

/*express is using create a http server*/
const app = express();

// connect to mongodb


mongoose.connect(config.getDbConnectionString(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
    });


// //routes
endpoints(app);


//Listing port
// Fire up server
// Print friendly message to console
app.listen(port, () => {
    console.log('app started at port 8100');
});

