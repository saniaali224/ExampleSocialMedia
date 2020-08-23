'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Posts = new Schema({
    Tags: {
        type: String,
        
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Interest',

    },
    Title: {
        type: String,


    },
    Description: {
        type: String,

    },
    image: {
        type: String,

    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    ,

    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'replies'
        }
    ]
},
    {
        timestamps: true
    }
);


let posts = mongoose.model('Posts', Posts);

module.exports = posts;