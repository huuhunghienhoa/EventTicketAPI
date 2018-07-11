var User = require('../Models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
module.exports = {
  check : (req, res, next) => {

  var token = req.headers['authorization'];
  if (!token) return res.send({ status: 'AUTHORIZATION_REQUIRED' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.send({status: 'AUTHORIZATION_REQUIRED'});
     if (!decoded)
      res.status(200).json({status: 'PERMISSION_DENIED'});
    else {
      req.decoded = decoded;
      next();
    }
  });
}
}
