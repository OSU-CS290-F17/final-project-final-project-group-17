/*
 * Public functions related to tasks live in this file
 */

function Task(task_id, task_group, task_title, task_details, date_added, date_due, date_done) {
  this.task_id      = task_id;
  this.task_group   = task_group;
  this.task_title   = task_title;
  this.task_details = task_details;
  this.date_added   = date_added;
  this.date_due     = date_due;
  this.date_done    = date_done;
}
