/* Node.js server defined here */

var path     = require('path');
var express  = require('express');
var exphbs   = require('express-handlebars');
var app      = express();
var port     = process.env.PORT || 3000;
var bp       = require('body-parser');
var db       = require('./database');

/* Body Parser Middleware */
app.use(bp.json());

/* Database Middleware */
app.get("/ajax/loadtasks", function(req, res) {
  res.status(200).send(db.loadAllTasks());
});

app.get("/ajax/loadtasks/:groupId", function(req, res) {
  res.status(200).send(db.loadAllTasksByGroup(req.params.groupId));
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


/* Serve public directory */
app.use(express.static('public'));


/* 404 Route */
app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
