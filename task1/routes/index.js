const cors = require('cors');
const bodyParser = require('body-parser');
const verifytoken = require("../utils/index");
const multer = require("multer");


// Import Route Controllers
const posts = require('./Controllers/posts');
const interest = require('./Controllers/getinterest');
const admin = require('./Controllers/Users');
const comment = require('./Controllers/comments');


const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

// Setup Route Bindings
exports = module.exports = function (app) {

    // middlewares
    // Configure app for bodyParser()
    // lets us grab data from the body of POST
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use(cors());

    app.get("/", (req, res) => {
        res.end("ok")
    });
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/posts',verifytoken.authJwt, upload.single('image'), posts.create);
    // app.get('/api/interest', interest.getAll);
    // app.post('/api/interests', interest.create);
    app.get('/api/getAllcomments',verifytoken.authJwt, comment.getAll);
    app.post('/api/replies', verifytoken.authJwt,comment.addreplies);
    app.get('/api/getAllPosts',verifytoken.authJwt, posts.getAll);
    app.post('/api/usersignup', admin.Signup);
    app.post('/api/userslogin', admin.login);
    app.post('/api/:postid/comment',verifytoken.authJwt, comment.addComment);
};