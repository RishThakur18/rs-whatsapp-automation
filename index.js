const express = require('express');
const serverless = require('serverless-http');
let indexRoutes = require('./routes/api.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRoutes);
app.use('*', (req, res) => res.status(404).send('404 Not Found'));

module.exports.handler = serverless(app);

