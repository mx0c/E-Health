var express = require('express')
var app = express()
var router = express.Router();
var config = require('./config.json')

app.use(express.json())
app.use(express.static('public'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(router);
app.use('/', router);

console.log(`Server Listening on Port ${config.port}`)
app.listen(config.port)
