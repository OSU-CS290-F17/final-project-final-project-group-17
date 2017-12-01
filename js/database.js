/* Database Interface
 *
 * Contains all functions for getting data to and from the database on the
 * server side.
 *
 * FA17_CS290 Final Project
 * Casey Dinsmore
 *
 */

 module.exports = new FileDatabase();

 function FileDatabase() {

   this.tasksDB = require("./db.json");
   this.fs = require("fs");

 }


/* Load all Task objects from the database sorted by task_group then task_priority
 * @TODO Evaluate if this is actually needed
 *
 * Returns:
 *    array of Task objects
 */
FileDatabase.prototype.loadAllTasks = function() {

  var groups = ['A', 'B', 'C', 'D', 'E'];
  var data = { };
  groups.forEach(function(task_group) {
    if (!data[task_group]) {
      data[task_group] = {};
    }
    if (!data[task_group]["tasks"]) {
      data[task_group]["tasks"] = [];
    }
    data[task_group]["letter"] = task_group;
    data[task_group]["tasks"] = this.loadAllTasksByGroup(task_group);
  }.bind(this));

  return JSON.stringify(data);

}

/* Load all Task objects in the specified group from the database sorted by task_priority
 *
 * Params:
 *   group - one of the fixed group values: 'A' 'B' 'C' 'D' 'E'
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
  return JSON.stringify(filtered);
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
FileDatabase.prototype.saveTask = function(task) {
  // should we do error correction here?

  // lazy modfiy, delete old task and insert new with the same task_id
  if (parseInt(task.task_id) > 0) {
    this.deleteTask(task.task_id);
    this.tasksDB["tasks"].push(task);
  } else {
    // increment task_id and push new task
    this.tasksDB["max_task_id"]++;
    task.task_id = this.tasksDB["max_task_id"];
    this.tasksDB["tasks"].push(task);
  }

  this._saveToDisk();
  return task.task_id;

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
FileDatabase.prototype.deleteTask = function(task_id) {
  var start_size = this.tasksDB["tasks"].length;

  this.tasksDB["tasks"] = this.tasksDB["tasks"].filter( function(row) { return (row.task_id != task_id) });

  this._saveToDisk();
  return this.tasksDB["tasks"].length < start_size;

}

/*
 * Safe task database to disk.
 *
 */
FileDatabase.prototype._saveToDisk = function() {
  this.fs.writeFileSync('./js/db.json', JSON.stringify(this.tasksDB, null, 2) , 'utf-8');
}
