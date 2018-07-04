const CreateJob = require('../models/CreateJob.model.js');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AppliedJobsWithDetailsSchema = mongoose.Schema({

	appliedId:String,
	userId:String,
	jobId:String,
	isApplied:Boolean,
	appliedDate:Date,
	appliedMsg:String,
	jobDetails:{ type: Schema.Types.ObjectId, ref:'CreateJob'}
 });

module.exports = mongoose.model('AppliedJobsWithDetails', AppliedJobsWithDetailsSchema);