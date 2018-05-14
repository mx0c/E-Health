# E-Health HSRT SS2018
Project Digital Waitingroom

## Server Setup:
* npm install
* node server.js

## MongoDB Setup:
* TODO

## BackendEndpoints:

| Method        | Name               | Request  | Response |
| ------------- | ------------------ | -------- | -------- |
| POST          | /createAppointment | **Body:** name:String, date:Date(), time:String(HH:MM), name:String, estDuration:String(minutes) </br> **Headers:** authorization:String(JWToken) | HTTP Status code: 200 OK |
| POST          | /login             | **Body:** username:String, password:string(SHA256 hashed) | 200 OK + JWToken |
| GET           | /getAppointments   | **Headers:** authorization:String(JWToken) | Appointment[] |
| GET           | /getQueuePosition  | **Body:** name:String </br> **Headers:** authorization:String(JWToken) | Queueposition:int |
