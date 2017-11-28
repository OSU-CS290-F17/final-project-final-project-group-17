/* Node.js server defined here */

var path     = require('path');
var express  = require('express');
var exphbs   = require('express-handlebars');
var app      = express();
var port     = process.env.PORT || 3000;

var db       = require('./database');


/* Database Stubs */
app.get("/ajax/loadtasks", function(req, res) {
  console.log("==db", db);
  res.status(200).send(db.loadAllTasks());

});

app.get("/ajax/loadtasks/:groupId", function(req, res) {
  console.log("==db", db);
  res.status(200).send(db.loadAllTasksByGroup(req.params.groupId));

});

app.get("/ajax/deltask/:taskId", function(req, res) {

  res.status(200).send(db.deleteTask(req.params.taskId));

});

app.get("/ajax/savetasks", function(res, res) {

  res.status(200).send(db.saveTask(  {
      "task_group": "B",
      "task_title": "Fake Dynamic Task",
      "task_details": "This is a very long description of a dynamic task.",
      "task_priority": "1",
      "date_added": "2017-11-21",
      "date_due": "2017-12-01",
      "date_done": ""
    } ));

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
