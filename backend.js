//
// (c) Lauritz Holtmann 2020
// v0.2
//

const express = require('express')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser');
const cors = require('cors');

// express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// variables
var task = null;
var result = null;

// Endpoint: Dispatch task and free variable
app.get('/task', (req, res) => {
  res.json({'task':task});
  task = null;
})

// Endpoint: Receive task
app.post('/task', (req, res) => {
    try {
        console.log(req.body);
        task = req.body.task;
        console.log(`Received Task: ${task}`);
    } catch(e) {
        console.log(`Received Task caused an error: ${task}`)
    }
    
    res.send("Stay tuned!");
})

// Endpoint: Receive task result
app.post('/result', (req, res) => {
    try {
        result = req.body.result
        console.log(`Received Result: ${result}`);
    } catch(e) {
        console.log(`Received Result caused an error: ${e}`);
    }
    res.send("Thank you!");
})

// Endpoint: Publish result of task
app.get('/result', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.json({'result':result});
})

// Launch web server(s)
const port = 1337;
const port_https = 1338;
const ip = "127.0.0.1";
app.listen(port, ip, () => {
  console.log(`Backend server listening at http://${ip}:${port}`)
})

https.createServer({
    key: fs.readFileSync('example.key'),
    cert: fs.readFileSync('example.crt')
  }, app).listen(port_https, ip, () => {
    console.log(`Backend server listening at https://${ip}:${port_https}`)
  })