// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');
var User = require('./models/user');
var Code = require('./models/code');

var CURR_USER_ID =  "5a1f661fca9ce01239c26156";

//to do later
function getFirebaseId(){
  return 1234;
}



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


//get all code entries
app.post('/api/view_entries', function(req,res){
  if(currUserId === undefined){
    return res.status(500).json({message:"Invalid POST Request", data:[]});
  }

  User.findById(currUserId, (err,user)=>{
    if(err){
      res.status(500);
      res.send(err);
    }

    if(user!=null){
        res.send(200);
        res.json(user)
    }

  })
})



//new code entry
app.post('/api/add_code_entry', function(req, res) {
  var currUserId = CURR_USER_ID;

  if(currUserId === undefined || req.body.code === undefined){
    console.log(req.body.userID);
    console.log(req.body.code);
    return res.status(500).json({message:"Invalid POST Request", data:[]});
  }


  let objectID = "";
  let newCode = new Code();
  // let currUser = new User();

  // newCode.codeID = 0; //TODO: Generate new ID
  newCode.dateCreated = new Date();
  newCode.codeEntry = req.body.code;
  newCode.comment = req.body.comment;
  newCode.metaTags = req.body.tags;
  newCode.language = req.body.language;


  console.log("call collection");
  newCode.save(function(err,code){
   if (err) return;
   // Object inserted successfully.
   // console.log(code);
   objectID = code._id; // this will return the id of object inserted

   User.findByIdAndUpdate(currUserId,
     {$push: {'codeEntry': objectID}},
     {safe: true, upsert: true},
       function(err){
       if(err) return;
       // console.log(objectID);
     }
   )
   return res.status(201).json({message:"Code Snippet Saved", newCodeID:objectID});
   console.log(objectID);
   });
  });

  // var codeIDRoute = router.route('/api/code/:id');

  app.delete('/api/code/:id',function(req,res){
    console.log("This isnt printing");
    Code.findById(req.params.id, (err,code)=>{
      if(err){
        res.status(500);
        res.send(err);
      }

      console.log(code);

      if(code!=null){
        User.findById(code.ownerID, (err,user)=>{
          if(err){
            res.status(500);
            res.send(err);
          }

          if(user!=null){
            user.codeEntry.pull(req.params.id);
            console.log("code entry removed from user");
          }})

        console.log("hello");
        Code.remove({
          _id:req.params.id
        }
        , (err)=>{
          if(err){
            res.status(500);
            res.send(err);
        } else {
        res.status(200);
        res.json({message:"Code Entry Deleted"})
        }
      })
  }})});







// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
