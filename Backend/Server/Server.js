var express = require('express')
var mongo = require('mongodb')
var app = express()
var jwt = require('jsonwebtoken');
var config = require('./config.json');

app.use(express.json());
var url = config.mongoUrl;
var MongoClient = mongo.MongoClient;

//HTTP Routes
app.post('/createAppointment', (req, res) => {
  if(!verifyJwt(req.headers.authorization)){
    res.sendStatus(400)
  }
  MongoClient.connect(url, (err, db) => {
    if (err) res.sendStatus(500);
    var dbo = db.db("e-health-db");
    var myobj = { name: req.body.name, date: req.body.date, time: req.body.time, estDuration: req.body.estDuration };
    dbo.collection("appointments").insertOne(myobj, (err, res) => {
      if (err) res.sendStatus(500);
      db.close();
      res.sendStatus(200);
    });
  });
})

app.post('/login',(req, res) => {
  userObj = {username: req.body.username ,password: req.body.password};
  MongoClient.connect(url, (err, db) => {
    if (err) res.sendStatus(500);
    var dbo = db.db("e-health-db");
    dbo.collection("users").findOne(userObj, (err, result) => {
      if (err) res.sendStatus(400);
      db.close();
      res.status(200)
      return res.json({token: jwt.sign({ username: req.body.username}, 'topsecret', { expiresIn: "1h" })});
    });
  });
});

app.get('/getAppointments',(req,res) => {
  if(!verifyJwt(req.headers.authorization)){
    res.sendStatus(400)
  }
});

function verifyJwt(token){
  try {
    var decoded = jwt.verify(token, config.secret);
    return true
  } catch(err) {
    return false
  }
}

console.log(`Server Listening on Port ${config.port}`)
app.listen(config.port)
