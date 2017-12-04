//export user schema here
// Load required packages
var mongoose = require('mongoose');
var Code = require('./code')
let Schema = mongoose.Schema;

// Define our user schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dateCreated: Date,
    firebaseID: String,
    codeEntry: [
      {
        type:Schema.Types.ObjectId, ref:"Code"
      }
    ]
});
console.log('Loaded User Schema');
// Export the Mongoose model
module.exports = mongoose.model('User', userSchema);
