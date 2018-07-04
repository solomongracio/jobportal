
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	userId:String,
	userName:String,
	email:String,
	password:String,
	role:String
 });

module.exports = mongoose.model('User', UserSchema);