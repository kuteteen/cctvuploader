var google = require('googleapis');
var fs = require('fs');
var mime = require('mime');
var token = require('./gettoken.js');
var date = require('./getdate.js');
var drive = google.drive('v2');
var counter = 0;
var timer = 0;

date.getDateTime(function(time) {
  console.log('started at: ' + time);
}); 

token.setToken(function(authtoken) {
  getFiles(authtoken);
}); 

function getFiles(authtoken) {
  console.log('getting files');
  var dir = '<YOUR SOURCE VIDEO FOLDER PATH GOES HERE>';
  var files = fs.readdirSync(dir);
  for (var i in files){
    if (counter >= 0 && counter <= 50) {
      var path = dir + '/' + files[i];
      var name = files[i];
        if (fs.statSync(path).isDirectory()){
            getFiles(path, files_);
        } else if (mime.lookup(name) == 'image/jpeg') {
            var mimetype = 'image/jpeg';
            insertFile(name, path, mimetype, authtoken);
            counter++;
        } else if (mime.lookup(name) == 'video/x-msvideo') {
            var mimetype = 'video/x-msvideo';
            insertFile(name, path, mimetype, authtoken);
            counter++;
        } else {
          console.log('Ignoring: ' + name + ' not a photo/video');
        }    
    } else { 
      if (counter >= 50) {
        return;
      }
    }
  }
}

function insertFile(name, path, mimetype, authtoken) {
  if (mimetype == 'image/jpeg') {
    var parentfolder = '<YOUR GOOGLE DRIVE IMAGE FOLDER ID GOES HERE>';
  } else if (mimetype == 'video/x-msvideo') {
      var parentfolder = '<YOUR GOOGLE DRIVE VIDEO FOLDER ID GOES HERE>';
    } else {
        console.log('Ignoring: ' + name + ' not a photo/video');
        return;
      }

  drive.files.insert({
    resource: {
      title: name,
      parents: [{id: parentfolder}],
      mimeType: mimetype
    },
    media: {
      mimeType: mimetype,
      body: fs.createReadStream(path)
    },
    auth: authtoken
    }, function(err, response) {
    if (err) {
      console.log('Error: inserting file ' + name, err);
      throw err;
    } else {
      console.log('Inserted:', name + ' ' + response.id);
      fs.unlink(path, function (err) {
        if (err) { 
          throw err;
        } else { 
          console.log('successfully deleted ' + name);
          counter--;
          console.log(counter);
          if (counter = 0) {
            date.getDateTime(function(time) {
              console.log('finished at: ' + time);
            });
          }
        }
      });
      return;
    }
  }