'use strict';

// TODO DONE: Initialize your project using NPM to create and populate  package.json and package-lock.json files. Don't forget to add node_modules to your .gitignore!

// TODO DONE: Require the ExpressJS package that you installed via NPM, and instantiate the app.
const express = require('express');
const app = express();
// Remember to install ExpressJS, and be sure that it's been added to your package.json as a dependency.
// There is also a package here called body-parser, which is used by the provided POST route. Be sure to install that and save it as a dependency after you create your package.json.

const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = 3000;

// TODO DONE: Include all of the static resources as an argument to app.use().

app.use(express.static('./public'));

// COMMENT: Why are our files in a "public" directory now? How does ExpressJS serve files?
// The files within the public directory are the files that can be accessed by the client. ExpressJS accesses these files with the app.use() command, then serves them with different route declarations. 

// TODO DONE: Refactor to use arrow function
app.post('/articles', bodyParser, (request, response) => {
    // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
    console.log(request.body);
    response.send('Record posted to server!!');
});

// TODO DONE: Write a new route, using an arrow function, that will handle a request and send the new.html file back to the user
app.get('/', (request, response) => {
    response.sendFile('/public/index.html', {root:'.'});
});

// TODO DONE: Write a new route, using an arrow function, that will handle any other routes that were not defined and deliver a 404 status message to the user

app.get('*', (request, response) => {
    response.status('404');
});

app.listen(PORT, () => {
    // TODO DONE: Refactor this to arrow function, log to the console a message that lets you know which port your server has started on

    console.log(PORT);

});
