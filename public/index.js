function modalVisible(){
	var addModal = document.getElementById('add-task-modal');
  	var modalBackdrop = document.getElementById('modal-backdrop');

  	addModal.classList.remove('hidden');
  	modalBackdrop.classList.remove('hidden');
}


function clearInputs() {
	var addTaskInputElements = [
		document.getElementById('add-task-id'),
	  document.getElementById('add-task-short'),
	  document.getElementById('add-task-date'),
	  document.getElementById('add-task-prio')
	];

	addTaskInputElements.forEach(function (inputElem) {
	  inputElem.value = '';
	});
}


function modalHide() {

  	var addModal = document.getElementById('add-task-modal');
 	var modalBackdrop = document.getElementById('modal-backdrop');

 	addModal.classList.add('hidden');
  	modalBackdrop.classList.add('hidden');

  	clearInputs();
}


function addTask(postVals) {

    var addRequest = new XMLHttpRequest();
    addRequest.open('POST', '/ajax/savetask');
    addRequest.addEventListener('load', function(event) {
      data = JSON.parse(event.target.response);

			if (event.target.status == 200 ) {
				// Remove old element on edit
				if (postVals["task_id"]) {
					var task = document.getElementById(postVals["task_id"]);
					task.parentNode.removeChild(task);
				}
					postVals._id = data.task_id;
					var newtask = Handlebars.templates.task(postVals);
					var group = document.getElementById("group-" + postVals["task_group"]);
					group.insertAdjacentHTML('beforeend', newtask);

				modalHide();
			} else {
				alert("There was a problem adding the task to the database.");
			}

    });

    addRequest.setRequestHeader('Content-Type', 'application/json');
    addRequest.send(JSON.stringify(postVals));

    event.preventDefault();
}


function modalAccept() {
	var task_id = document.getElementById('add-task-id');
	var shortDesc = document.getElementById('add-task-short');
	var date = document.getElementById('add-task-date');
	var priority = document.getElementById('add-task-prio');
	var group = document.getElementById('add-task-group');

	if(!shortDesc.value || !date.value || !priority.value ){
		alert("All fields must be entered properly");
	} else {
		var postVals = {
      		"task_group": group.value,
      		"task_title": shortDesc.value,
      		"task_priority": priority.value,
      		"date_due": date.value,
    	}
			// Add in the task_id for an update operation
			if (task_id.value) {
				postVals["task_id"] = task_id.value;
			}
    	addTask(postVals);
	}
}


function taskDeletion(getID) {
	var getTasks = document.getElementsByClassName('task-container');

    var rmRequest = new XMLHttpRequest();
    rmRequest.open('GET', '/ajax/deltask/' + getID);
    rmRequest.addEventListener('load', function(event) {
			// If the back end returned OK
			if (event.target.status == 200 ) {

						var task = document.getElementById(getID);
						var group = document.getElementById("group-" + task.getAttribute("data-group"));
						task.parentNode.removeChild(task);
			} else {
				alert('There was an error deleting the task from the database.');
			}

    });

    rmRequest.send();

    event.preventDefault();
}


function taskEdit(task_id) {

	var task = document.getElementById(task_id);
	var date = task.querySelector(".due-date");
	var shortDesc = task.querySelector(".short-desc");

  document.getElementById('add-task-id').value    = task_id;
	document.getElementById('add-task-group').value = task.getAttribute("data-group");
	document.getElementById('add-task-prio').value  = task.getAttribute("data-priority");
	document.getElementById('add-task-date').value  = date.textContent;
	document.getElementById('add-task-short').value = shortDesc.textContent;

	// modalAccept will handle upsert connection

	modalVisible();
}


function taskActions(event) {

	if (event.target.classList.contains('remove-task')) {
		taskDeletion(event.target.getAttribute("data-id"));
  }
	if (event.target.classList.contains('edit-task')) {
		taskEdit(event.target.getAttribute("data-id"));
	}
}


window.addEventListener('DOMContentLoaded', function() {
	var cancelModal = document.getElementById('cancel-modal-button');
	cancelModal.addEventListener('click', modalHide);

	var xModal = document.getElementById('close-modal-top');
	xModal.addEventListener('click', modalHide);

  var addTask = document.getElementById('add-task');
	addTask.addEventListener('click', modalVisible);

	var acceptButton = document.getElementById('accept-modal-button');
	acceptButton.addEventListener('click', modalAccept);

	var groupContainer = document.getElementById('container');
	groupContainer.addEventListener('click', taskActions);

});
