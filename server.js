const express = require('express');
//middleware for logging server requests
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

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

