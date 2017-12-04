/* Node.js server defined here */
/* is middleware between client and server serving pages */

// Task Organizer server.js FA17_CS290
// Name: Nicholas Davies

var path     = require('path');
var express  = require('express');
var exphbs   = require('express-handlebars');
var app      = express();
var port     = process.env.PORT || 3000;
var bp       = require('body-parser');
var db       = require('./database');

//mongo stuff
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* Body Parser Middleware */
app.use(bp.json());

/* Database Middleware */
app.get("/ajax/loadtasks", function(req, res) {
  db.loadAllTasks(function(err, results) {
    if (err) {
        res.status(500).send("ERROR");
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.get("/ajax/deltask/:taskId", function(req, res) {

  db.deleteTask(req.params.taskId, function(err) {
    if (err) {
      res.status(500).send("ERROR");
    } else {
      res.status(200).send("OK");
    }
  });
});

app.post("/ajax/savetask", function(req, res) {
  id = db.saveTask(req.body, function(err, id) {
    if (err) {
      res.status(500).send("ERROR");
    } else {
      res.status(200).send(JSON.stringify({task_id: id}));
    }
  });
});

// function to render pages and tasks or 404
app.get('/', function (req, res)
{

  db.loadAllTasks(function(err, results) {
    if (err) {
        res.status(500).send("ERROR");
    } else {
      res.status(200).render('index', {tasks: results});
    }
  });

});


/* Serve public directory */
app.use(express.static('public'));


/* 404 Route */
app.get('*', function (req, res) {
  res.status(404).render('404');
});


// heres the mongo error handling
MongoClient.connect(mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }

  // Hand off mongo library and connection to db
  db.init(mongo, connection);

  app.listen(port, function () {
    console.log("== Server listening on port:", port);
  });
});

// app.listen(port, function () {
//      console.log("== Server listening on port:", port);
// 	 });
