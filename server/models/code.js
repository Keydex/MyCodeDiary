//Insert Code Entry Schema
// Load required packages
var mongoose = require('mongoose');
var Task = require('./user');
let Schema = mongoose.Schema;
// Define our user schema
var codeSchema = new mongoose.Schema({
    codeID: Number,
    dateCreated: Date,
    codeEntry: String,
    language: String,
    metaTags: [String],
    comment:String,
    ownerID:{type:Schema.Types.ObjectId, ref:"User"},
    firebaseOwnerID:String
});
console.log('Loaded Code Schema');
// Export the Mongoose model
module.exports = mongoose.model('Code', codeSchema);
