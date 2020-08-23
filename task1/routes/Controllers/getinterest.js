const interest = require("../../models/interest");
const posts = require("../../models/posts");
const config = require('../../config');
let mongoose = require('mongoose');
const interestController = {
    create: async (req, res) => {
        const response = {};
        try {
            let payload = {
                interest: req.body.interests,

            };
            console.log(payload)
            interest.create(payload, async (err, data) => {
                if (data) {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                    await res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 500;
                    console.log(err)
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                }

            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
    getAll: async (req, res) => {
        const response = {};
        try {
            //  
            // let interests = req.query;
            interest.find(
                 
               async (err, data) => {
                    if (err) {
                        response.statusCode = 500;
                        response.body = JSON.stringify({ err });
                        res.status(response.statusCode).send(response.body);
                    } else {
                        response.statusCode = 200;
                        response.body = JSON.stringify({
                            message: 'Ok',
                            data: data
                        });
                    }
                    await res.status(response.statusCode).send(response.body);
                })
                
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({" err":err });
            res.status(response.statusCode).send(response.body);
        }
    }
}
module.exports = interestController;