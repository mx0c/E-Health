var express = require('express')
var app = express()
var router = express.Router();
var config = require('./config.json')
app.use(express.json())

require('./routes')(router);
app.use('/', router);

console.log(`Server Listening on Port ${config.port}`)
app.listen(config.port)
