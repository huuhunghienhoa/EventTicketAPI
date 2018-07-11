var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  is_admin: Boolean
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
