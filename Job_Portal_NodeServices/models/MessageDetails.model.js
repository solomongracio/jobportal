
const mongoose = require('mongoose');

const MessageDetailsSchema = mongoose.Schema({
	

    		mesId:String,
    		userId:String,
    		msgData:String,
    		msgDate:String,
    		msgFrom:String,
    		isRead:Boolean


 },{ strict: false });

module.exports = mongoose.model('MessageDetails', MessageDetailsSchema);