
const mongoose = require('mongoose');

const CreateJobSchema = mongoose.Schema({
	jobId: String,
	isApplied: Boolean,
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
 },);

module.exports = mongoose.model('CreateJob', CreateJobSchema);