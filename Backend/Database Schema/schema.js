var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/e-health-db";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("e-health-db");

  //Create appointments collection
  dbo.createCollection("appointments", function(err, res) {
    if (err) throw err;
    var date = new Date(new Date().setHours(12,18,0,0));
    var myobj = { name: "Hans Wurst", bdate: date, date: date, time: "10:18", estDuration: "30", finished:false };
    dbo.collection("appointments").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    console.log("appointments Collection created!");
  });

  //Create Users collection
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("user Collection created!");
    var myobj = { username: "admin", password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" };
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
  });

  //Create differenceTime collection
  dbo.createCollection("differenceTime", function(err, res) {
    var obj = {dTime:0}
    dbo.collection("differenceTime").insertOne(obj,(err,res)=>{
      if (err) throw err;
      console.log("1 document inserted");
    })
  });
  
  db.close();
});
