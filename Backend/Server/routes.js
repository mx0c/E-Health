'use strict'
var config = require('./config.json')
var dbInterface = require('./dbinterface')
var jwt = require('jsonwebtoken')

module.exports = router => {
  router.post('/createAppointment', (req, res) => {
    dbInterface.createAppointment(req.body.name,req.body.date,req.body.time,req.body.estDuration,req.headers.authorization)
    .then(() => {
      res.sendStatus(200)
    }).catch((errCode) => {
      res.sendStatus(errCode)
    })
  })

  router.post('/login',(req, res) => {
    dbInterface.checkUser(req.body.username,req.body.password)
    .then(()=>{
      res.status(200)
      return res.json({token: jwt.sign({ username: req.body.username}, config.secret, { expiresIn: "1h" })});
    }).catch((errCode) => {
      res.sendStatus(errCode)
    })
  })

  router.get('/getAppointments',(req,res) => {
    dbInterface.getAppointments(req.headers.authorization)
    .then((result)=>{
      res.status(200)
      res.send(result)
    }).catch((errCode)=>{
      res.sendStatus(errCode)
    })
  });

  router.get('/getQueuePosition',(req,res) => {
    dbInterface.getQueuePosition(req.query.name, req.headers.authorization)
    .then((result)=>{
      res.status(200)
      res.send(result)
    }).catch((errCode)=>{
      res.sendStatus(errCode)
    })
  })
}
