
const mongoose = require('mongoose');

const JobApplySchema = mongoose.Schema({

	appliedId:String,
	userId:String,
	jobId:String,
	isApplied:Boolean,
	appliedDate:Date,
	appliedMsg:String,
	status:String,
	 jobDescription: String,
    position :String,
    band : String,
    location:String,
	hiringManager : String,
	recuriter :String,
	keySkills: String,
	secondarySkills:String,
	startDate:String,
	endDate:String,
	createdBy:String
 });

module.exports = mongoose.model('JobApply', JobApplySchema);