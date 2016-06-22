// This code is based on https://github.com/google/google-api-nodejs-client/blob/master/samples/oauth2.js

'use strict';

var readline = require('readline');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var fs = require('fs');

// Client ID and client secret are available at https://console.developers.google.com/iam-admin/projects
var CLIENT_ID = '<<ENTER YOUR CLIENT ID HERE>>';
var CLIENT_SECRET = '<<ENTER YOUR CLIENT SECRET HERE>>';
var REDIRECT_URL = '<<ENTER YOUR REDIRECT URL HERE>>';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/drive' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client & save the token to a file
      var jsontoken = JSON.stringify(tokens);
      fs.writeFile('token.json', jsontoken);
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':');
    return;
  });
});
