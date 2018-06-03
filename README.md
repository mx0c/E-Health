# E-Health HSRT SS2018
Project Digital Waitingroom

## Server Setup:
* $ npm install
* $ node server.js

## MongoDB Setup:
* install mongodb community server
* add mongo bin folder to PATH variable
* start mongoserver with: $ mongod
* $ node schema.js

## BackendEndpoints:

| Method        | Name               | Request  | Response |
| ------------- | ------------------ | -------- | -------- |
| POST          | /createAppointment | **Body:** name:String, date:(JS Date Object), time:String(HH:MM), estDuration:String(minutes) </br> **Headers:** authorization:String(JWToken) | HTTP Status code: 200 OK |
| POST          | /login             | **Body:** username:String, password:string(SHA256 hashed) | 200 OK + JWToken |
| GET           | /getAppointments   | **Headers:** authorization:String(JWToken) | Appointment[] |
| GET           | /getQueuePosition  | **QueryString:** name:String </br> **Headers:** authorization:String(JWToken) | Queueposition:int |
