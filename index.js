const express = require('express')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require('./config');

const app = express();
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views')
app.set('view engine', 'ejs');
app.use(express.static('public'))

var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var eventRouter =  require('./routes/event');
var buyticketRouter =  require('./routes/buyticket');
var resetRouter =  require('./routes/resetdb');
var ticketRouter = require('./routes/ticket');
//Su dung Model user de tao account admin khi start sever.
var Usertb = require('./app/Models/user');

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/events', eventRouter);
app.use('/buy-ticket', buyticketRouter);
app.use('/reset', resetRouter);
app.use('/tickets', ticketRouter);
app.use('/event', eventRouter)

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/EventMongoose';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createAdacc(){
   var passwordIsValid = bcrypt.hashSync("bapcodewar", 8);
   let user = await Usertb.findOne({ username: "BE.admin" });
    if(!user) {
      Usertb.create({
      username : "BE.admin",
      password : passwordIsValid,
      is_admin : true
    }, function (err, user) {
      console.log("Thanh cong");
    });
    }else {
      console.log("Da ton tai TK admin");
    };
};
app.listen(process.env.PORT || 3000, function() {
  createAdacc();
  console.log("Dang chay port 3000");
})

