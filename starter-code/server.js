'use strict';

// TODO: Initialize your project using NPM to create and populate  package.json and package-lock.json files. Don't forget to add node_modules to your .gitignore!

// TODO: Require the ExpressJS package that you installed via NPM, and instantiate the app.
// Remember to install ExpressJS, and be sure that it's been added to your package.json as a dependency.
// There is also a package here called body-parser, which is used by the provided POST route. Be sure to install that and save it as a dependency after you create your package.json.

const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = 3000;

// TODO: Include all of the static resources as an argument to app.use().
app.use( express.static('./public' ));

// COMMENT: Why are our files in a "public" directory now? How does ExpressJS serve files?
// Our files are in a public directory, so that they can be accessed via the www. ExpressJS then serves the files that are stored in our public directory—the app.use method will deliver the files for every HTTP request to the public folder.

// TODO: Refactor to use arrow function
app.post('/articles', bodyParser, (request, response) => {
    // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
    console.log(request.body);
    response.send('Record posted to server!!');
});

// TODO: Write a new route, using an arrow function, that will handle a request and send the new.html file back to the user
app.get('/new', (request, response) => {
    console.log('Request new page', request);
    response.sendFile('/public/new.html', {root: '.'});
});

// TODO: Write a new route, using an arrow function, that will handle any other routes that were not defined and deliver a 404 status message to the user
app.get( '*', ( request, response ) => {
    console.log( 'user made a request to something does not exist' );
    response.status('404').send( 'Nope, not found. Try again.' );
});

app.listen(PORT, () => {
    // TODO: Refactor this to arrow function, log to the console a message that lets you know which port your server has started on
    console.log(`Listening on port ${3000}`);
});