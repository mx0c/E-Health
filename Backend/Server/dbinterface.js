'use strict'
var mongo = require('mongodb')
var config = require('./config.json')
var url = config.mongoUrl
var MongoClient = mongo.MongoClient
var jwt = require('jsonwebtoken')
var ObjectID = mongo.ObjectID

//*************************************************************************************************
//*************************************** Helper Functions ****************************************

function verifyJwt(token){
  try {
    var decoded = jwt.verify(token, config.secret)
    return true
  } catch(err) {
    return false
  }
}

function compareAppointments(a1,a2){
	try{
		return (a1.name == a2.name && a1.bdate.toString() == a2.bdate.toString() && a1.date.toString() == a2.date.toString() && a1.time == a2.time && a1.estDuration == a2.estDuration)
	}catch(e){
		return false
	}
}

//*************************************************************************************************

exports.changeAppointmentStatus = (id, token, status) => {
  return new Promise((resolve,reject)=>{
    if (!verifyJwt(token)) return reject(401)
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      var query = {_id:ObjectID(id)}
      var values = { $set: {finished:status}}
      dbo.collection("appointments").updateOne(query,values,(err,res)=>{
        if (err) return reject(500)
        db.close();
        resolve()
      })
    })
  })
}

exports.setDifferenceTime = (dTime,token) => {
	return new Promise((resolve,reject)=>{
		console.log(dTime)
		if (!verifyJwt(token)) return reject(401)
		MongoClient.connect(url, (err, db) => {
		  if (err) return reject(500)
		  var dbo = db.db("e-health-db")
		  dbo.collection("differenceTime").updateOne({},{$set: {dTime:dTime}},function(err, result){
			if (err) return reject(500)
			db.close();
			return resolve()
		  })
		})
	})
}
exports.getDifferenceTime = () => {
	return new Promise((resolve,reject)=>{
		MongoClient.connect(url, (err, db) => {
		  if (err) return reject(500)
		  var dbo = db.db("e-health-db")
		  dbo.collection("differenceTime").findOne({},function(err, result){
			  console.log(err)
			  if (err) return reject(500)
			  db.close();
			  return resolve(result);
		  })
		})
    })
}

exports.deleteAppointment = (id, token) => {
  return new Promise((resolve,reject) => {
    if (!verifyJwt(token)) return reject(401)
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      var query = {_id:ObjectID(id)}
      dbo.collection("appointments").deleteOne(query,(err,obj) => {
        if (err) return reject(500)
        db.close();
        resolve()
      })
    })
  })
}

exports.createAppointment = (name, bdate, date, time, estDuration, token) => {
  return new Promise((resolve,reject) => {
    if (!verifyJwt(token)) return reject(401)
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      //extract hours and seconds from String
      var mytime = time.split(":");
      //generate Date object with time
      var myDate = new Date(date);
      myDate.setHours(mytime[0])
      myDate.setMinutes(mytime[1])
      var myobj = { name: name, bdate: new Date(bdate), date: myDate, time: time, estDuration: estDuration, finished: false };
      dbo.collection("appointments").insertOne(myobj, (err, res) => {
        if (err) return reject(500)
        db.close()
        resolve()
      })
    })
  })
}

exports.checkUser = (uname, pass) => {
  return new Promise((resolve, reject) => {
    var userObj = {username: uname ,password: pass};
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      dbo.collection("users").findOne(userObj, (err, result) => {
        if (err) return reject(401)
		if (result) return resolve()
        db.close()
        reject(401)
      })
    })
  })
}

exports.getQueueInformations = (name,bdate) => {
  return new Promise((resolve,reject) => {
    var appointment;
    var delayDuration = 0;
    MongoClient.connect(url, function(err, db) {
    if (err) resolve(500);
	  var dbo = db.db("e-health-db");
      //find my next appointment
      dbo.collection("appointments").find({name: name, bdate: new Date(bdate),finished:false}).sort({date: 1}).toArray((err, result)=>{
        if (err) resolve(500);
        appointment = result[0];
        dbo.collection("appointments").find({finished:false}).sort({date: 1}).toArray((err, result)=>{
          var count = 0;
          result.forEach(elem=>{
            if(compareAppointments(elem,appointment)){
              db.close();
              return resolve({position:count.toString(),appointmentTime:appointment.time,delayDuration:delayDuration.toString()});
            }
            delayDuration += parseInt(elem.estDuration);
            count++;
          })
          reject(404)
        })
      })
    })
  })
}

exports.getAppointments = (token) => {
  return new Promise((resolve, reject) => {
    if (!verifyJwt(token)) return reject(401)
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      dbo.collection("appointments").find({}).toArray(function(err, result) {
        if (err) return reject(500)
        db.close();
        resolve(result)
      });
    })
  })
}
