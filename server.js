const express = require('express')
const https = require('https')
const fs = require('fs')

let app = express()

let key = fs.readFileSync('/tutorial.key','utf-8')
let cert = fs.readFileSync('/tutorial.crt','utf-8')

const port = 8443
const parameters = {
  key: key,
  cert: cert
}

app.get('/',(req,res)=>{
  res.send('HTTPS in ExpressJS')
})

let server = https.createServer(parameters,app)

server.listen(port,()=>{
  console.log(`Server is listening at port ${port}`)
})