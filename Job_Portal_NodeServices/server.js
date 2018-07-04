var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var redis =require('redis');
 

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//redisClient=redis.createClient({"host":"localhost","port":6379,"char-set":"utf-8","decode_responses":true})






const createJobContoller = require('./controllers/createJob.controller.js');
const MessageContoller = require('./controllers/Messages.contoller.js');
const UserContoller = require('./controllers/User.controller.js');
const JobApplyController = require('./controllers/JobApply.controller.js');




app.post('/createJob', createJobContoller.create)


app.get('/getAllJobs', createJobContoller.findAll)

app.get('/getjob', createJobContoller.findOne)

app.get('/deletejob', createJobContoller.delete)



app.post('/createMessage', MessageContoller.create)

app.get('/getMessage', MessageContoller.findOne)


app.get('/getMessageByJobId', MessageContoller.getListByJobId)



app.post('/createUser', UserContoller.create)

app.post('/login', UserContoller.signin)

app.get('/getUser', UserContoller.getUser)

app.get('/getAllUser', UserContoller.findAll)





app.post('/applyJob', JobApplyController.applyJob)


app.get('/viewAppliedJobDetails', JobApplyController.viewAppliedJobDetails)

app.get('/viewAllAppliedJobs', JobApplyController.viewAllAppliedJobs)





var port=3333;


var server=app.listen(port,function(){
	console.log("Server strated on Port "+port)
});
server.setTimeout=600000;