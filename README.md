# E-Health HSRT SS2018
Project Digital Waitingroom

## Server Setup:
* npm install
* node server.js

## MongoDB Setup:
* TODO

## BackendEndpoints:
* POST /createAppointment
** Request: 
*** Body: name:String, date:Date(), time:String(HH:MM), name:String, estDuration:String(minutes)
*** Headers: authorization:String(JWToken)
** Response:
*** HTTP Status code: 200 OK

* POST /login
** Request: 
*** Body: username:String, password:string(SHA256 hashed)
** Response:
*** 200 OK + JWToken

* GET /getAppointments
** Request: 
*** Headers: authorization:String(JWToken)
** Response: 
*** Appointment[]

* GET /getQueuePosition
** Request: 
*** Body: name:String
*** Headers: authorization:String(JWToken)
** Response: 
*** Queueposition:int