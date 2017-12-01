'use strict';

// TODO: Initialize your project using NPM to create and populate  package.json and package-lock.json files. Don't forget to add node_modules to your .gitignore!
// TODO: Require the ExpressJS package that you installed via NPM, and instantiate the app.
// Remember to install ExpressJS, and be sure that it's been added to your package.json as a dependency.
// There is also a package here called body-parser, which is used by the provided POST route. Be sure to install that and save it as a dependency after you create your package.json.

const express = require('express');
const app = express();

const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = 3000;

// TODO: Include all of the static resources as an argument to app.use().
app.use(express.static('./public'));

app.get('/', (request, response) => {
    response.sendFile('/index.html', {root: '.'});
});
// COMMENT: Why are our files in a "public" directory now? How does ExpressJS serve files?
// We put the files in a 'public' directory because there are other files which we do not want the client to have access to, which we want only to exist on the server. ExpressJS serves files using requests and responses (.get, and sendFile).

// TODO: Refactor to use arrow function
app.post('/articles', bodyParser, (request, response) => {
    // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
    console.log(request.body);
    response.send('Record posted to server!!');
});

// TODO: Write a new route, using an arrow function, that will handle a request and send the new.html file back to the user
app.get('/new', (request, response) => {
    response.sendFile('/new.html', {root: '.'});
});

// TODO: Write a new route, using an arrow function, that will handle any other routes that were not defined and deliver a 404 status message to the user
app.get( '*', function ( request, response ) {
    response.status('404').sendFile( '/public/404.html', { root: '.' } );
});



// TODO: Refactor this to arrow function, log to the console a message that lets you know which port your server has started on
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)

});