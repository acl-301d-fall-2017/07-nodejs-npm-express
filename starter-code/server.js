'use strict';

// TODO: Initialize your project using NPM to create and populate  package.json and package-lock.json files. Don't forget to add node_modules to your .gitignore!
const express = require('express');
const app = express();
const PORT = 4567;

app.use( express.static('./public') );

app.get('/home', (request, response) => {
    console.log('made a request to /');
    response.sendFile('/public/index.html', {root: '.'});
});

// this route will send cats4life.html when user
// makes GET request to path /dogs
app.get('/dogs', (request, response) => {
    // console.log('REQUEST LOOKS LIKE:', request);
    response.sendFile('/public/cats4life.html', {root: '.'});
});

app.get('/humans', (request, response) => {
    response.sendFile('/public/humans.json', {root: '.'});
});

app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// TODO: Require the ExpressJS package that you installed via NPM, and instantiate the app.
// Remember to install ExpressJS, and be sure that it's been added to your package.json as a dependency.
// There is also a package here called body-parser, which is used by the provided POST route. Be sure to install that and save it as a dependency after you create your package.json.

const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = 3000;

// TODO: Include all of the static resources as an argument to app.use().

// COMMENT: Why are our files in a "public" directory now? How does ExpressJS serve files?
// PUT YOUR RESPONSE HERE

// TODO: Refactor to use arrow function
app.post('/articles', bodyParser, function(request, response) {
    // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
    console.log(request.body);
    response.send('Record posted to server!!');
});

// TODO: Write a new route, using an arrow function, that will handle a request and send the new.html file back to the user

// TODO: Write a new route, using an arrow function, that will handle any other routes that were not defined and deliver a 404 status message to the user

app.listen(PORT, function() {
    // TODO: Refactor this to arrow function, log to the console a message that lets you know which port your server has started on

});
