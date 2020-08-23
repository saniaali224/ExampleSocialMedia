'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users = new Schema({
   Firstname: {
        type: String,
        required:true
        
    },
    Lastname: {
        type: String,
        required:true
        
    },
    email: {
        type: String,
        
    },
   password: {
        type: String,
        required:true
    }},
    {
        timestamps: true
    }
);


let users = mongoose.model('Users', Users);

module.exports =  users;