'use strict';

//Initialized project using NPM to create and populate  package.json and package-lock.json files. Added node_modules to .gitignore

//Requires the ExpressJS package installed via NPM, and instantiates the app.
const express = require('express');
const app = express();
const PORT = 3000;


// Installed ExpressJS, added to package.json as a dependency.
// There is also a package here called body-parser, which is used by the provided POST route. Installed, and saved as a dependency after creating package.json.

const bodyParser = require('body-parser').urlencoded({extended: true});
//const PORT = 3000;

//Includes all of the static resources as an argument to app.use().
app.use( express.static('./public') );

// COMMENT: Why are our files in a "public" directory now? How does ExpressJS serve files?
// Our files are now in a "public" directory because we want to specify the root directory from which to serve static assets. By doing this, I can now load the files that are in a particular public directory.  (ie: I can get them from the server.)  ExpressJs serves files by allowing clients (browsers) to download the files as they are, from the server.

// Refactored to use arrow function
app.get('/', (request, response) => {
    console.log('made a request to /');
    response.sendFile('/public/index.html', {root: '.'});
});
app.post('/articles', bodyParser, function(request, response) {
    // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
    console.log(request.body);
    response.send('Record posted to server!');
});

// TODO: Write a new route, using an arrow function, that will handle a request and send the new.html file back to the user
app.get('/new', (request, response) => {
    // console.log('REQUEST LOOKS LIKE:', request);
    response.sendFile('/public/new.html', {root: '.'});
});

// Wrote a new route, using an arrow function, that will handle any other routes that were not defined and deliver a 404 status message to the user
app.get( '*', function ( request, response ) {
    console.log( 'they made a request to something??' );
    response.status('404').send( 'not found');
});


//app.listen(PORT, function() {
//Refactored this ^^ to arrow function, logging to console a message that lets you know which port my server has started on
app.listen( PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

