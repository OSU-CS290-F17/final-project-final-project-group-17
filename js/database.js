/* Database Interface
 *
 * Contains all functions for getting data to and from the database on the
 * server side. Both Mongo and File databases are supported
 *
 * FA17_CS290 Final Project
 * Casey Dinsmore
 *
 */

 //module.exports = new MongoDatabase();
module.exports = new FileDatabase();


 function MongoDatabase() {
   this.mongodb = null;
   this.connection = null;
 }

 MongoDatabase.prototype.init = function(mongo, conn) {
   this.mdb = mongo;
   this.connection = conn;
   this.collection = conn.collection('taskList');
 }


 /* Load all Task objects from the database sorted by task_group
  * then sort them by task_priority.
  *
  * Callback:
  *    true if error, false and array of tasks if success
  */
 MongoDatabase.prototype.loadAllTasks = function(callback) {

   this.collection.aggregate( [ { $group : { _id: "$task_group", tasks: { $push: "$$ROOT" } } },
                                { $sort: {_id: 1} } ], function (err, results) {
     if (err) {
       callback(true);
     } else {
      // Sort tasks by priority
      results.forEach(function(group) {
        group.tasks.sort(function(a, b) {
          return a["task_priority"] - b["task_priority"];
        });
      });

      callback(false, results);
    }
   });
 }


 /*
  * Delete a task object from the database.
  *
  * A boolean will be passed to the callback with result of deletion
  *
  * Params:
  *   task_id - an id of a task
  *
  * Callback:
  *    true if error, false if success
  */
MongoDatabase.prototype.deleteTask = function(task_id, callback) {

   //var mdb = require('mongodb')
   this.collection.deleteOne( { _id: new this.mdb.ObjectId(task_id) }, function(err, result) {
      if (err) {
        callback(true);
      } else {
        callback(false);
      }
   });
 }


 /*
  * Save a task object to the database. If the object does not contain a task_id
  * then a new item will be saved to the database. Otherwise the task with this
  * id will be updated.
  *
  * Status of the save operation as well as the task_id (the new one if it was inserted).
  *
  * Params:
  *   task - a filled Task object
  *
  * Callback:
  *    true if error otherwise false and task_id
  */
 MongoDatabase.prototype.saveTask = function(task, callback) {

   // translate task_id to a Mongo ObjectId
   if (task.task_id == '') {
     id = new this.mdb.ObjectId();
   } else {
     id = new this.mdb.ObjectId(task.task_id);
   }
   delete task.task_id;

   this.collection.findOneAndUpdate({_id: id}, task, {upsert: true, new: true}, function(err, result){
     if (err) {
       callback(true);
     } else {
       // id is returned differently depending on insert or update
       callback(false, result.lastErrorObject.upserted || result.value._id);
     }
   });

}


/* ############################ FileDatabase ############################## */

 function FileDatabase() {

   this.tasksDB = require("./db.json");
   this.fs = require("fs");

 }


/* Load all Task objects from the database sorted by task_group then task_priority
 *
 * Returns:
 *    array of Task objects
 */
FileDatabase.prototype.loadAllTasks = function(callback) {

  var groups = ['A', 'B', 'C', 'D'];
  var data = { };
  groups.forEach(function(task_group) {
    if (!data[task_group]) {
      data[task_group] = {};
    }
    if (!data[task_group]["tasks"]) {
      data[task_group]["tasks"] = [];
    }
    data[task_group]["_id"] = task_group;
    data[task_group]["tasks"] = this.loadAllTasksByGroup(task_group);

  }.bind(this));

  callback(false, data);

}

/* Load all Task objects in the specified group from the database sorted by task_priority
 *
 * Params:
 *   group - one of the fixed group values: 'A' 'B' 'C' 'D'
 *
 * Returns:
 *    array of Task objects
 */
FileDatabase.prototype.loadAllTasksByGroup = function(group) {
  var filtered = new Array();

  this.tasksDB["tasks"].forEach(function(task) {
    if (group.trim().toUpperCase() == task.task_group) {
      filtered.push(task);
    }
  });

  // Sort tasks by priority
  filtered.sort(function(a, b) {
    return a["task_priority"] - b["task_priority"];
  });

  return filtered;
}

/* Save a task object to the database. If the object does not contain a task_id
 * then a new item will be saved to the database. Otherwise the task with this
 * id will be updated.
 *
 * An object will be returned with a status of the save operation as well as
 * the task_id (the new one if it was inserted).
 *
 * Params:
 *   task - a filled Task object
 *
 * Returns:
 *    object { status: true || false, task_id: task_id }
 */
FileDatabase.prototype.saveTask = function(task, callback) {
  // should we do error correction here?

  // lazy modfiy, delete old task and insert new with the same task_id
  if (parseInt(task.task_id) > 0) {
    this.deleteTask(task.task_id, function(err, result) {
     this.tasksDB["tasks"].push(task);
     }.bind(this));
  } else {
    // increment task_id and push new task
    this.tasksDB["max_task_id"]++;
    task.task_id = this.tasksDB["max_task_id"];
    this.tasksDB["tasks"].push(task);
  }

  this._saveToDisk();
  callback(false, task.task_id);

}


/* Delete a task object from the database.
 *
 * A boolean will be returned with the result of the delete operation.
 *
 * Params:
 *   task_id - an id of a task
 *
 * Returns:
 *    boolean true or false
 */
FileDatabase.prototype.deleteTask = function(task_id, callback) {
  var start_size = this.tasksDB["tasks"].length;

  this.tasksDB["tasks"] = this.tasksDB["tasks"].filter( function(row) { return (row.task_id != task_id) });

  this._saveToDisk();
  callback(false, this.tasksDB["tasks"].length < start_size);

}

/*
 * Safe task database to disk.
 *
 */
FileDatabase.prototype._saveToDisk = function() {
  this.fs.writeFileSync('./js/db.json', JSON.stringify(this.tasksDB, null, 2) , 'utf-8');
}

FileDatabase.prototype.init = function() {

}
