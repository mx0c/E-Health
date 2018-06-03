var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/e-health-db";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("e-health-db");
  dbo.createCollection("appointments", function(err, res) {
    if (err) throw err;
    console.log("appointments Collection created!");
    dbo.createCollection("users", function(err, res) {
      if (err) throw err;
      console.log("user Collection created!");
      var myobj = { name: "Hans Wurst", bdate: new Date(), date: new Date(), time: "10:18", estDuration: "30" };
      dbo.collection("appointments").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        var myobj = { username: "admin", password: "8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918" };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    });
  });
});
