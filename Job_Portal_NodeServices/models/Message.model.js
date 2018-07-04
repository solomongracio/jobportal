const MessageDetails = require('./MessageDetails.model.js');
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
	jobId:String,
	userId:String,
	userName:String,
   userMsg:[{
	

    		mesId:String,
    		userId:String,
    		msgData:String,
    		msgDate:String,
    		msgFrom:String,
    		isRead:Boolean


 }]
    
 }


 );

module.exports = mongoose.model('Message', MessageSchema);