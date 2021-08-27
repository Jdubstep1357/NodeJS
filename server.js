const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;


const app = express();
//this allows develpment version
app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));

//app.use((STUFF IN HERE)) is callback function
//req is request object
//res is response object
//next is function
app.use((req, res,) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

//create an instance of http server class and start listening to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
