/* Database Interface
 *
 * Contains all functions for getting data to and from the database on the
 * server side.
 *
 * Casey Dinsmore
 *
 */

/* Load all Task objects from the database sorted by task_group then task_priority
 * @TODO Evaluate if this is actually needed
 *
 * Returns:
 *    array of Task objects
 */
function loadAllTasks() {

}

/* Load all Task objects in the specified group from the database sorted by task_priority
 *
 * Params:
 *   group - one of the fixed group values: 'A' 'B' 'C' 'D' 'E'
 *
 * Returns:
 *    array of Task objects
 */
function loadAllTasksByGroup(group) {

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
function saveTask(task) {

}


/* Delete a task object from the database.
 *
 * A boolean will be returned with the result of the delete operation.
 *
 * Params:
 *   task - a filled Task object
 *
 * Returns:
 *    boolean true or false
 */
function deleteTask(task) {

}
