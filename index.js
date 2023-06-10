require('dotenv').config();

const express = require('express');
let indexRoutes = require('./routes/api.js');
const https = require('https')
const fs = require('fs');
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRoutes);
app.use('*', (req, res) => res.status(404).send('404 Not Found'));

let key = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf-8');
let cert = fs.readFileSync(process.env.SSL_CRT_PATH,'utf-8');
const parameters = {
    key: key,
    cert: cert
  }

let server = https.createServer(parameters,app)

server.listen(port, () => {
    console.log(`Server is listening at port ${port}`) 
});

