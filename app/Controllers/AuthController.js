// Dữ liệu user mẫu dùng để login. [username: admin, pass: admin]
var User = require('../Models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

module.exports = {
  getLogin : (req, res) => {
    res.render('../views/login');
  },
  postLogin : (req, res) => {
    let req_username = req.body.username;
    let req_password = req.body.password;

    User.findOne({ username: req_username }, function (err, user) {
      //if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.json({status: 'USERNAME_PASSWORD_NOT_MATCHED'});

      var passwordIsValid = bcrypt.compareSync(req_password, user.password);
      if (!passwordIsValid || ( user.username != req_username ))
        return res.json({status: 'USERNAME_PASSWORD_NOT_MATCHED'});
      var token = jwt.sign({ id: user._id, is_admin: user.is_admin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
      return res.status(200).json({status: 'SUCCESS', data: { token: token, is_admin: user.is_admin} });
    });


  },
  getRegister : (req, res) => {
    res.render('../views/register');
  },
  postRegister : (req, res) => {
  let req_username = req.body.username.trim();
   User.findOne({ username: req_username }, function (err, user) {
    if (user) return res.json({status: 'USERNAME_EXISTED'});

    var hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);
    User.create({
      username : req_username,
      password : hashedPassword,
      is_admin : false
    }, function (err, user) {
      res.status(200).send({status: 'SUCCESS'});
    });
  });
 }
}
