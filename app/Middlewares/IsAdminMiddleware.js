var User = require('../Models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');
module.exports = {
  checkAdmin : (req, res, next) => {
  console.log("Check tocken");
  console.log(req.headers['authorization']);
    var token = req.headers['authorization'];
    if (!token) return res.json({ status: 'AUTHORIZATION_REQUIRED' });

    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(200).json({ status: 'AUTHORIZATION_REQUIRED' });
      if (!decoded.is_admin)
        res.status(200).json({status: 'PERMISSION_DENIED'});
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
}
