'use strict'
var config = require('./config.json')
var dbInterface = require('./dbinterface')
var jwt = require('jsonwebtoken')

module.exports = router => {
  router.post('/createAppointment', (req, res) => {
    dbInterface.createAppointment(req.body.name,req.body.bdate, req.body.date, req.body.time,req.body.estDuration,req.headers.authorization)
    .then(() => {
      res.sendStatus(200)
    }).catch((errCode) => {
      if (errCode >= 100 && errCode < 600){
			res.sendStatus(errCode);
		}else{
			res.sendStatus(500);
		}
    })
  })

  router.post('/login',(req, res) => {
    dbInterface.checkUser(req.body.username,req.body.password)
    .then(()=>{
      res.status(200)
      return res.json({token: jwt.sign({ username: req.body.username}, config.secret, { expiresIn: "1h" })});
    }).catch((errCode) => {
		if (errCode >= 100 && errCode < 600){
			res.sendStatus(errCode);
		}else{
			res.sendStatus(500);
		}
    })
  })

  router.get('/getAppointments',(req,res) => {
    dbInterface.getAppointments(req.headers.authorization)
    .then((result)=>{
      res.status(200)
      res.send(result)
    }).catch((errCode)=>{
      if (errCode >= 100 && errCode < 600){
			res.sendStatus(errCode);
		}else{
			res.sendStatus(500);
		}
    })
  });

  router.get('/getQueuePosition',(req,res) => {
    dbInterface.getQueuePosition(req.query.name, req.query.bdate)
    .then((result)=>{
      res.status(200)	
      res.send(result.toString())
    }).catch((errCode)=>{
      if (errCode >= 100 && errCode < 600){
			res.sendStatus(errCode);
		}else{
			res.sendStatus(500);
		}
    })
  })
}
