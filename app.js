<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


// routes imports
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const PostsRoutes = require('./routes/PostsRoutes');
const CategoriesRoutes = require('./routes/CategoriesRoutes');


// CORS resolution
app.use('*', cors());
app.use(cookieParser());
// parser les requêtes au format JSON
app.use(bodyParser.json());

// Security Configurations
const parseForm = bodyParser.urlencoded({ extended: false });
app.use(parseForm);

// utilisations des routes
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/posts', PostsRoutes);
app.use('/api/categories', CategoriesRoutes);


module.exports = app;
=======
/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
>>>>>>> e8f2bc6c0391d98158e7a13bbfc4edfb381fa077
