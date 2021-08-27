const express = require('express');
//middleware for logging server requests
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
//when app recieves json data, it parses json data into javascript properties of data
app.use(express.json());

//app.all is a routing method that is a catch all for http verbs
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    //setHeader -- sending plain text in response body
    res.setHeader('Content-Type', 'text/plain');
    //next passes control of application routing to relevant routing. Without it, the data would just stop here and not go anywhere
    next();
});

//setting up endpoint for get request for campsites
//tales callback function
app.get('/campsites', (req, res) => {
    //response status and header code already set up with app.all on line 14
    res.end('Will send all the campsites to you');
});

//takes information to next relevant information, after going through app.all
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

//deletes campsites
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

//allows us to store whatever client sends as part of the path after slash as route parameter named campsiteId
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of campsite: ${req.params.campsiteID} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite ${req.body.name}
    with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//dirname refers to absolute path it is in
app.use(express.static(__dirname + '/public'));


app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//creates instance of server class and listens to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

