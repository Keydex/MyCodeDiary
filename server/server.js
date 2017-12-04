// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');
var User = require('./models/user');
var Code = require('./models/code');

var FIREBASE_USER_ID = "12345";
var CURR_USER_ID =  "5a259cac41f8540416f03cbc";

//to do later
function getMlabUserId(firebase_id){
  User.findOne({'firebaseID':firebase_id}, function(err,user){
    if (err){
      res.status(404);
      return res.json({message:"Could not find user with firebaseID on mlab"});
    }
    return user;
  })
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




//Add new user to DB
//Requires firebaseID in body of request
app.post('/api/user',function(req,res){
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.dateCreated = Date.now();
  newUser.firebaseID = req.body.firebaseID;

  newUser.save((err,user)=>{
    if(err){
      res.status(500);
      res.send(err);
    }
    res.status(201);
    res.json({
      message: 'Successfully added user',
      data: user
   });
 });
})

//Get code entries for a user.
//Note: this is essentially what you do when the user logs in.
//Pass {"firebaseID": user's id} in json body of post request.
app.post('/api/entries',function(req,res){
  User.findOne({'firebaseID':req.body.firebaseID}, function(err,user){
    if (err){
      res.status(404);
      return res.json({message:"Could not find user with firebaseID on mlab"});
    }
    if (user==null){
      return res.json({message:"Could not find user with firebaseID on mlab"});
    }

    Code.find({'ownerID':user._id}, function(err,codes){

      if(err){
        res.status(500);
        return res.json({message:"Error finding entires for user"});
      }
      return res.json(codes);
    })
  })
})


//Add a new code entry.
//Make sure you include "firebaseID: user's ID" in the body of the post request.
app.post('/api/code', function(req, res) {
  User.findOne({'firebaseID':req.body.firebaseID}, function(err,user){
    if (err){
      res.status(404);
      return res.json({message:"Could not find user with firebaseID on mlab"});
    }
    if (user==null){
      return res.json({message:"Could not find user with firebaseID on mlab"});
    }

    //do search using params
    let newCode = new Code();
    newCode.dateCreated = new Date();
    newCode.codeEntry = req.body.code;
    newCode.comment = req.body.comment;
    newCode.metaTags = req.body.tags;
    newCode.language = req.body.language;
    newCode.ownerID = user._id;
    newCode.firebaseOwnerID = req.body.firebaseID;

    newCode.save(function(err,code){
     if (err) return res.json(err);
     return res.status(201).json(code);
    })
  })
});


//Update existing code entry.
//Note than empty fields WILL NOT be changed.
app.put('/api/code/:id',function(req,res){
  Code.findById(req.params.id, (err,code)=>{

    if(err){
      res.status(404);
      res.send();
    }

    if(req.body.code!=null){
      code.codeEntry = req.body.code;
    }

    if(req.body.comment!=null){
      code.comment = req.body.comment;
    }

    if(req.body.tags!=null){
      code.metaTags = req.body.tags;
    }

    if(req.body.language!=null){
      code.language = req.body.language;
    }


    code.save(err=>{
      if(err){
        res.status(500);
        res.send(err);
      }
      res.status(200);
      res.json({message:"Code updated successfully,"});
    })
  })
})


app.delete('/api/code/:id',function(req,res){
  Code.findByIdAndRemove(req.params.id, (err, code)=>{
    if (err){
      res.status(500);
      res.send(err);
    }

    res.status(200);
    res.json({message: "Code entry successfully removed."});
  })
})

// //Add new code entry
// app.post('/api/add_code_entry', function(req, res) {
//   var currUserId = CURR_USER_ID;
//
//   if(currUserId === undefined || req.body.code === undefined){
//     console.log(req.body.userID);
//     console.log(req.body.code);
//     return res.status(500).json({message:"Invalid POST Request", data:[]});
//   }
//
//
//   let objectID = "";
//   let newCode = new Code();
//   // let currUser = new User();
//
//   // newCode.codeID = 0; //TODO: Generate new ID
//   newCode.dateCreated = new Date();
//   newCode.codeEntry = req.body.code;
//   newCode.comment = req.body.comment;
//   newCode.metaTags = req.body.tags;
//   newCode.language = req.body.language;
//   newCode.ownerID = CURR_USER_ID;
//
//
//   console.log("call collection");
//   newCode.save(function(err,code){
//    if (err) return;
//    objectID = code._id; // this will return the id of object inserted
//
//    User.findByIdAndUpdate(currUserId,
//      {$push: {'codeEntry': objectID}},
//      {safe: true, upsert: true},
//        function(err){
//        if(err) return;
//        // console.log(objectID);
//      }
//    )
//    return res.status(201).json({message:"Code Snippet Saved", newCodeID:objectID});
//    console.log(objectID);
//    });
//   });
//
//
//   //Delete a code entry given ID
//   app.delete('/api/code/:id',function(req,res){
//     Code.findById(req.params.id, (err,code)=>{
//       if(err){
//         res.status(500);
//         res.send(err);
//       }
//
//       console.log(code);
//
//       if(code!=null){
//         User.findById(code.ownerID, (err,user)=>{
//           if(err){
//             res.status(500);
//             res.send(err);
//           }
//
//           if(user!=null){
//             user.codeEntry.pull({_id:req.params.id});
//             console.log("code entry removed from user");
//           } else {
//             return res.status(404).json({message:"Invalid User"});
//           }
//
//         console.log("hello");
//         Code.remove({
//           _id:req.params.id
//         }
//         , (err)=>{
//           if(err){
//             res.status(500);
//             res.send(err);
//           }
//           //do stuff
//           res.status(200).json({message:"Code entry removed successfully."});
//         })
//       })
//     } else {
//       res.status(404);
//       res.json({message:"Code entry not found"})
//       }
//     })});




    // //get all code entries for CURR_USER_ID
    // app.post('/api/view_entries', function(req,res){
    //   if(currUserId === undefined){
    //     return res.status(500).json({message:"Invalid POST Request", data:[]});
    //   }
    //
    //   User.findById(currUserId, (err,user)=>{
    //     if(err){
    //       res.status(500);
    //       res.send(err);
    //     }
    //
    //     if(user!=null){
    //         res.send(200);
    //         res.json(user)
    //     }
    //   })
    // })



// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
