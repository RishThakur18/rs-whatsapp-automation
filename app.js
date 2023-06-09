process.env = require('./.env.js')(process.env.NODE_ENV || 'development');

const port = process.env.PORT || 9000;
const express = require('express');
const https = require('https')
const fs = require('fs');

let indexRoutes = require('./routes/index.js');

const main = async () => {
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/', indexRoutes);
    app.use('*', (req, res) => res.status(404).send('404 Not Found'));
    
    let key = fs.readFileSync('/tutorial.key','utf-8');
    let cert = fs.readFileSync('/tutorial.crt','utf-8');
    const parameters = {
        key: key,
        cert: cert
      }

    let server = https.createServer(parameters,app)
    
    server.listen(port, () => {
        console.log(`Server is listening at port ${port}`) 
    });
};
main();