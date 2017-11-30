//export user schema here
// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dateCreated: Date,
    userID: Number,
    codeEntry: [String]
});
console.log('Loaded User Schema');
// Export the Mongoose model
module.exports = mongoose.model('User', userSchema);
