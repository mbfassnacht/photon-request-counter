// Modules
var Spark = require('spark');
var request = require('request');
var config = require('./config.js');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// START - Config PARAMS
var sparkUsername = config.spark.username;
var sparkPassword = config.spark.password;
// END - Config PARAMS

// LOGIN INTO SPARK
Spark.login({ username: sparkUsername, password: sparkPassword }, sparkConnected);


// START - Register Spark events

// END - Register Spark events


var deviceReference = null;

// After Login into Spark this methods are going to run

function sparkConnected(err, body) {
  console.log('API call login completed on callback:', err, body);
  Spark.listDevices(getDevicesComplete);
}

function getDevicesComplete(err, devices) {
  if (!err) {
    var device = devices[0];
    console.log('Device name: ' + device.name);
    console.log('- connected? ' + device.connected);
    console.log('- variables: ' + device.variables);
    console.log('- functions: ' + device.functions);
    console.log('- version: ' + device.version);
    console.log('- requires upgrade? ' + device.requiresUpgrade);

    Spark.getDevice('sparkCore', function(){
      deviceReadyHandler(err, device)
    });
  } else {
    console.log('Failure:: ' + err);
  }

}

function deviceReadyHandler(err, device) {
  console.log('Success:: Device ' + device.name + ' is ready');
  deviceReference = device;
  initServer();
}


function initServer(err, device) {
  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var port = 8000;

  // ROUTES FOR OUR API
  // =============================================================================
  var router = express.Router(); // get an instance of the express Router

  router.post('/red', function(req, res) {

    res.send(registerEvent('R'));

  }.bind(this));

  router.post('/yellow', function(req, res) {

    res.send(registerEvent('Y'));

  }.bind(this));
  
  router.post('/green', function(req, res) {

    res.send(registerEvent('G'));

  }.bind(this));

  function registerEvent(color){
    deviceReference.callFunction('increase', color, function(err, data) {
        if (err) {
          console.log(err);
          return 'Failure:: '+ err;
        } else {
          return 'Success:: Event Registered';
        }
      });
  }
  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', router);

  // START THE SERVER
  // =============================================================================
  app.listen(port);
  console.log('Success:: Spark server started at port ' + port);
}

