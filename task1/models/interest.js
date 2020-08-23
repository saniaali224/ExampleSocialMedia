'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Interest = new Schema({
    interests: {
        type: String
    },
    Tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'

    },
    
   



},
    {
        timestamps: true
    }
);


let Interests = mongoose.model('interest', Interest);

module.exports = Interests;