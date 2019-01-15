var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();
var port = 3001;

// le dice a express que el directorio 'uploads', es estatico.
app.use(express.static(path.join(__dirname, 'uploads')));

// para CORN
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});

var server = app.listen(port, function () {
  console.log("Listening on port %s...", port);
});