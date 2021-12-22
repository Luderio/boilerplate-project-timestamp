// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/test.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//----------------------------------------------------

//ROUTE

const path = '/api/:date';

let responseObject = {};

app.get(path, (request, response) => {
  let date_string = request.params.date;

  if (date_string.includes("-") || date_string.includes(" ") || date_string.includes("/")) {
    responseObject['unix'] = new Date(date_string).getTime();
    responseObject['utc'] = new Date(date_string).toUTCString();
  } else {
    date_string = Number(date_string);
    responseObject['unix'] = new Date(date_string).getTime();
    responseObject['utc'] = new Date(date_string).toUTCString();
  }

  if (!responseObject['unix'] || !responseObject['utc']) {
    response.json({"error": "invalid Date"});
  }
  response.send(responseObject);
});

const emptyPath = '/api/';
app.get(emptyPath, (request, response) => {
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();

  response.send(responseObject);
});
