// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');
var User = require('./models/user');
var Code = require('./models/code');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = 4000;

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection, { useMongoClient: true});
var db = mongoose.connection;
//This code below is debug code from mongoose to see if we connected successfully
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Server Connected Successfully");
});
// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader('Content-Type', 'application/json')
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/api/code', function(req, res) {
//Add code snippet into server
  if(req.body.userID === undefined || req.body.code === undefined){
    console.log(req.body.userID);
    console.log(req.body.code);
    return res.status(500).json({message:"Invalid POST Request", data:[]});
  }
  let newCode = new Code();
  let currUser = new User();
  newCode.codeID = 0; //TODO: Generate new ID
  newCode.dateCreated = new Date();
  newCode.codeEntry = req.body.code;
  //codeEntries is underfined here, need to fix
  //currUser.codeEntries.push(newCode.codeID);
  newCode.save((err, savedCode) => {
    if(err){
      return res.status(500).json({message:"Server has encountered an error saving Code Snippet", data:[]});
    }
    return res.status(201).json({message:"Success", data:[]});
  })
  //Wait we can't have two res returns here. What happens if we can't update user
  // currUser.save((err, savedUser) => {
  //   if(err){
  //     return res.status(500).json({message:"Server has encountered an error updating User", data:[]});
  //   }
  //   return res.status(201).json({message:"Success", data:[]});
  // })
});

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
