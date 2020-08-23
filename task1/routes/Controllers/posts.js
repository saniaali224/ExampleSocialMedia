const posts = require("../../models/posts");

const aws = require('aws-sdk');
const config = require('../../config');
const fs = require('fs');


let mongoose = require('mongoose');
const postsController = {
    create: async (req, res) => {
      
        const response = {};
        try {
            let{userid}=req.userId;
            let {
                Tags,
                Title,
                Description,
                image

            } = req.body;
            console.log(req.body);
            // image = req.file;
             if (  image !== '' && req.file !== undefined) {
            // const file =req.body.image;
            const Image = await upload(req.file);
            console.log(Image)
            let payload = {
                Tags: Tags,
                Title: Title,
                Description: Description,
                image: Image,
                UserID:userid
            };
            await posts.create(payload, async (err, data) => {
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
                    response.body = JSON.stringify({ "err": err });
                    res.status(response.statusCode).send(response.body);
                }

            })

       } } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ "err": err });
            console.log(err)
            res.status(response.statusCode).send(response.body);

        }
    
    },
    getAll:async (req, res) => {
        const response = {};
        try {
            posts.find(async (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.body = JSON.stringify({err});
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
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },

};
const upload = (file) => {
    const fileContent = fs.readFileSync(file);
    console.log("file",file);
    try {
        
        const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.Region,
            Bucket: config.AWS_BUCKET_NAME
        });


        const params = {
            Bucket: config.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: fileContent,
           
        };
        s3.upload(params, async function (err, data) {
            if (err) {

                console.log(err)

            } else {
                s3.getSignedUrl('putObject', params, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.end();
                    }
                    const returnData = {
                        signedRequest: data,
                        url: `https://${Bucket}.s3.amazonaws.com/${Key}`
                    };
                    res.write(JSON.stringify(returnData));
                    res.end();
                });
            }

        });
    } catch (err) {

        console.log(err)

    }



}


module.exports = postsController;