const http = require('http');
const fs = require('fs');
const _ = require('lodash')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // // write text or html in the browser 
    // res.setHeader('Content-Type','text/html');
    // res.write('<h1>My Informations</h1>');
    // res.write('<p>Name: Emran Ali <br> Age: 22 <br> Gender: Male</p>');
    // res.end();

    // lodash
    console.log(_.random(100,1))

    let path = './';

    switch (req.url) {
        case '/':
        case '/index.html':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about.html':
            path += 'about.html';
            res.statusCode = 200;
            break;
        
        case '/about':
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location','/about.html');
            res.end();
            break;
        default:
        path += '404.html';
        res.statusCode = 404;
        break;
    }


    // send html page to the browser
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(path, (err, data) => {

        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data); // write into browser multiple thing befor end response 
            res.end(data); // write once to the browser 
        }
    });


});


server.listen(3000, 'localhost', () => {
    console.log('Listning for request in port 3000');
});