let jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const verify = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.passphrase.Key, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });

};

module.exports = verify;