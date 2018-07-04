const JobApply = require('../models/JobApply.model.js');
const CreateJob = require('../models/CreateJob.model.js');
const AppliedJobsWithDetails = require('../models/AppliedJobsWithDetails.model.js');
var shortid = require('shortid');
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/JobPortal';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;



exports.applyJob = (req, res) => {

    var id = "VZ-AppliedId-" + shortid.generate();
    CreateJob.findOne({ 'jobId': req.body.jobId }).
        then(jobDesc => {

            const applyJob = new JobApply({
                appliedId: id,
                userId: req.body.userId,
                jobId: req.body.jobId,
                isApplied: true,
                status: "Applied",
                appliedDate: new Date(),
                appliedMsg: req.body.appliedMsg,
                jobDescription: jobDesc.jobDescription,
                position: jobDesc.position,
                band: jobDesc.band,
                location: jobDesc.location,
                hiringManager: jobDesc.hiringManager,
                recuriter: jobDesc.recuriter,
                keySkills: jobDesc.keySkills,
                secondarySkills: jobDesc.secondarySkills,
                startDate: jobDesc.startDate,
                endDate: jobDesc.endDate,
                createdBy: jobDesc.createdBy
            });
            applyJob.save()
                .then(data => {

                    CreateJob.find().
                        then(jobs => {
                            if (req.body.userId) {
                                JobApply.find({ 'userId':req.body.userId }).then(appliedJob => {
                                    let appliedJobId = appliedJob.map(job => job.jobId);
                                    
                                    let newJobs = jobs.map(job => {
                            
                                        if(appliedJobId.indexOf(job.jobId) > -1) {
                                           
                                            job["isApplied"] = true;
                                        }
                                      
                                        return job;
                                    })
                                   
                                    res.send(newJobs);
                                });
                            } else {
                                res.send(jobs);
                            }

                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Note."
                            });

                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Note."
                            });
                        });


                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                });
        });
    }

    exports.viewAppliedJobDetails = (req, res) => {

        JobApply.findOne({ 'userId': req.query.userId, 'appliedId': req.query.appliedId })
            .then(appliedJobs => {

                res.send(appliedJobs);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });


    };


    exports.viewAllAppliedJobs = (req, res) => {
        JobApply.find({ 'userId': req.query.userId })
            .then(appliedJobs => {

                res.send(appliedJobs);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });


    };

