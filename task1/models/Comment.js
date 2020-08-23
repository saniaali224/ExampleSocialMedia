'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Comments = new Schema({
    commentval: {
        type: String,
        // required: true,

    },
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }],
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    replies: [
        {
            text: {
                type: String,
                required: true,
            },
            // userId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'User',
            // },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
},
    {
        timestamps: true
    }
);


let comments = mongoose.model('comments', Comments);

module.exports = comments;