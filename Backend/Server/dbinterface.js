'use strict'
var mongo = require('mongodb')
var config = require('./config.json')
var url = config.mongoUrl
var MongoClient = mongo.MongoClient
var jwt = require('jsonwebtoken')

function verifyJwt(token){
  try {
    var decoded = jwt.verify(token, config.secret)
    return true
  } catch(err) {
    return false
  }
}

exports.createAppointment = (name, date, time, estDuration, token) => {
  return new Promise((resolve,reject) => {
    if (!verifyJwt(token)) return reject(401)
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      var myobj = { name: name, date: date, time: time, estDuration: estDuration };
      dbo.collection("appointments").insertOne(myobj, (err, res) => {
        if (err) return reject(500)
        db.close()
        resolve()
      })
    })
  })
}

exports.checkUser = (username, password) => {
  return new Promise((resolve, reject) => {
    userObj = {username: username ,password: password};
    MongoClient.connect(url, (err, db) => {
      if (err) return reject(500)
      var dbo = db.db("e-health-db")
      dbo.collection("users").findOne(userObj, (err, result) => {
        if (err) return reject(401)
        db.close()
        resolve()
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
