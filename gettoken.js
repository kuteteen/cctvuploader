var self = module.exports = {
  setToken: function (authtoken) {
    var google = require('googleapis');
    var OAuth2 = google.auth.OAuth2;
    var CLIENT_ID = 'CLIENT ID GOES HERE';
    var CLIENT_SECRET = 'CLIENT SECRET GOES HERE';
    var REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';
    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    var fs = require('fs');
      
    fs.readFile('node/cctvuploader/token.json', function (err, data) {
      if (err) { 
        console.log('Error reading token file: ', err);
        throw err;
      } else {
        console.log('Setting Token');
        var obj = JSON.parse(data);
        oauth2Client.setCredentials({ access_token: obj.access_token, refresh_token: obj.refresh_token });
        self.checkToken(oauth2Client, function(oauth2Client) {
          console.log(oauth2Client);
          authtoken(oauth2Client);
          return oauth2Client;
        });
      }
    });
  },
  checkToken: function(oauth2Client, checkresponse) {
    var google = require('googleapis');
    var plus = google.plus('v1');
    plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
      console.log('Checking Token');
      if (err) {
        console.log('Google Plus error ' + err);
        self.refreshToken(oauth2Client);
      } else {
        console.log('The token is ok ' + response.displayName);
        checkresponse(oauth2Client);
      }
    });
  },
  refreshToken: function(oauth2Client) {
    var fs = require('fs');
    console.log('Refreshing Token');
    oauth2Client.refreshAccessToken(function(err, tokens) {
      if (err) {
        console.log('Error refreshing token', err);
        throw err;
      } else {
        console.log('Saving Token');
        var jsontoken = JSON.stringify(tokens);
        fs.writeFile('node/cctvuploader/token.json', jsontoken, function(err, callback) {
          if (err) {
            console.log('Error saving tokeng', err);
            return;
          } else {
            self.setToken();
          } 
        });
      } 
    });
  }
};
