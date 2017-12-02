/* Node.js server defined here */

var path     = require('path');
var express  = require('express');
var exphbs   = require('express-handlebars');
var app      = express();
var port     = process.env.PORT || 3000;
var bp       = require('body-parser');
var db       = require('./database');
var serveDB = require('./db.json');
//mongo stuff
var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* Body Parser Middleware */
app.use(bp.json());

/* Database Middleware */
app.get("/ajax/loadtasks", function(req, res) {
  res.status(200).send(JSON.stringify(db.loadAllTasks()));
});

app.get("/ajax/loadtasks/:groupId", function(req, res) {
  res.status(200).send(JSON.stringify(db.loadAllTasksByGroup(req.params.groupId)));
});

app.get("/ajax/deltask/:taskId", function(req, res) {
  if (db.deleteTask(req.params.taskId)) {
    res.status(200).send("OK");
  } else {
    res.status(500).send("ERROR");
  }
});

app.post("/ajax/savetask", function(req, res) {
  id = db.saveTask(req.body);
  if (parseInt(id) > 0) {
    res.status(200).send(JSON.stringify({task_id: id}));
  } else {
    res.status(500).send("ERROR");
  }
});

app.get('/', function (req, res)
{
	res.status(200).render('index', {tasks: db.loadAllTasks()});
});

// app.get('/tasks/:postId', function(req, res, next) {
//   var postId = req.params.postId;
//   if (postData[postId])
// 	{
//     var post = postData[postId];
//     res.status(200).render('index', {posts: [post]});
// 	}
// 	else
// 	{
// 		next();
// 	}
// });

//heres the mongo error handling

// MongoClient.connect(mongoURL, function (err, connection) {
//   if (err) {
//     throw err;
//   }
//   mongoConnection = connection;
//   app.listen(port, function () {
//     console.log("== Server listening on port:", port);
//   });
// });

/* Serve public directory */
app.use(express.static('public'));


/* 404 Route */
app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
