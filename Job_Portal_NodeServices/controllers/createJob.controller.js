const CreateJob = require('../models/CreateJob.model.js');
const JobApply = require('../models/JobApply.model.js');
var shortid = require('shortid');
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/JobPortal';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;



exports.create = (req, res) => {

var id="VZ-"+req.body.location.substring(0,3)+"-"+"Band"+req.body.band+"-"+Math.floor(10000+Math.random()*90000)

	const newJob = new CreateJob({

         jobId: id,
    jobDescription: req.body.jobDescription,
    position :req.body.position,
    band : req.body.band,
    location:req.body.location,
    hiringManager : req.body.hiringManager,
    recuriter :req.body.recuriter,
    keySkills: req.body.keySkills,
    secondarySkills:req.body.secondarySkills,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    createdBy:req.body.createdBy


        
    });
    newJob.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    CreateJob.find()
    .then(jobs => {
        if (req.query.userId) {
            JobApply.find({ 'userId': req.query.userId }).then(appliedJob => {
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
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    

    CreateJob.findOne({ 'jobId': req.query.jobId})
        .then(job => {
           
        res.send(job);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });


   };

// Update a note identified by the noteId in the request


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

 CreateJob.remove({ 'jobId': req.query.jobId})
        .then(job => {
            console.log(job)
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });


   };

// Update a note identified by the noteId in the request
