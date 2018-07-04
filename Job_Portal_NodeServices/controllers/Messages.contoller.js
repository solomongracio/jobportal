const shortid = require('shortid');

const Message = require('../models/Message.model.js');
const MessageDetails = require('../models/MessageDetails.model.js');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/JobPortal';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;





exports.create = (req, res) => {

    var msgId="msg-"+shortid.generate();
    var msgDetailsArr = [];
    var msgDetail = {
        userId: req.body.userId,
        msgId,
        msgData: req.body.msgData,
        msgDate: new Date(),
        msgFrom: req.body.msgFrom,
        isRead: false
    };
    msgDetailsArr.push(msgDetail);
    Message.findOne({ 'jobId': req.body.jobId, 'userId': req.body.userId })
        .then((msg, err) => {
            if (!msg) {
                const message = new Message({
                    jobId: req.body.jobId,
                    userId: req.body.userId,
                    userName: req.body.userName,
                    userMsg: msgDetailsArr
                });

                message.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Note."
                        });
                    });


            }
            else if (msg.jobId === req.body.jobId && msg.userId === req.body.userId) {
                var msgArr = msg.userMsg;
                console.log(msgArr);
                msgArr.push(msgDetail)
                console.log("step2", msgArr);
                const updatedMessage = {
                    _id: msg._id,
                    jobId: req.body.jobId,
                    userId: req.body.userId,
                    userMsg: msgArr
                };

                Message.update({ _id: msg._id }, updatedMessage, function (err, raw) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(updatedMessage);
                });


            }


        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
}


exports.findOne = (req, res) => {
    console.log(req.query.jobId)
    console.log(req.query.userId)

    Message.findOne({ 'jobId': req.query.jobId, 'userId': req.query.userId })
        .then(job => {

            res.send(job);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};



exports.getListByJobId = (req, res) => {
   
    Message.find({ 'jobId': req.query.jobId})
        .then(job => {

            res.send(job);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};
