var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {   // Display the index.html on the local machine
    res.sendFile(path.join(__dirname + '/index.html'));
});


var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
//npm install request
var request = require('request');

// Replace "###...###" below with your project's host, access_key and access_secret.
var defaultOptions = {
  host: 'identify-us-west-2.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: '22db8b9670c5fcadf056dc31efc0bf50',
  access_secret: 'FvR2SVcVQSCRXgNcSSAOiUH2WCeqhkqbGYKkPcDw'
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(new Buffer(signString, 'utf-8'))
    .digest().toString('base64');
}

/**
 * Identifies a sample of bytes
 */
function identify(data, options, cb) {

  var current_data = new Date();
  var timestamp = current_data.getTime()/1000;

  var stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);

  var signature = sign(stringToSign, options.access_secret);

  var formData = {
    sample: data,
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    sample_bytes:data.length,
    timestamp:timestamp,
  }
  request.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData: formData
  }, cb);
}

var bitmap = fs.readFileSync('pow.mp3');

identify(new Buffer(bitmap), defaultOptions, function (err, httpResponse, body) {
  if (err) console.log(err);
  console.log(JSON.stringify(JSON.parse(body), null, 2));
});


app.listen(port, () => {  // listen to port 3000
    console.log("Server listening on port " + port);
});



Collapse 

4:35 PM
MP3 
pow.mp3
305 kB MP3Click to download



new messages
4:35 PM
package.json 
{
  "name": "scaryoke",
  "version": "1.0.0",
  "description": "mhacks11",
  "main": "server.js",


Click to expand inline (16 lines)

4:35 PM
index.html 
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">


Click to expand inline (23 lines)

4:36 PM
MP3 
POWER.mp3
7 MB MP3Click to download



Message Input

Message Ken Jiang, Harshita Girase, Malika K, Timothy Peyton
