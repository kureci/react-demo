const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

console.log('starting server');
const app = express();

app.use("/public", express.static(path.join(__dirname, '../public')));

const router = require('./router.js');

app.use(bodyParser.json({type: '*/*'}));

router(app);

// server setup
const port = 3333;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:',port);