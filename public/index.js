function modalVisible(){
	var addModal = document.getElementById('add-task-modal');
  	var modalBackdrop = document.getElementById('modal-backdrop');

  	addModal.classList.remove('hidden');
  	modalBackdrop.classList.remove('hidden');
}

function clearInputs() {
	var addTaskInputElements = [
	  document.getElementById('add-task-short'),
	  document.getElementById('add-task-date'),
	  document.getElementById('add-task-prio'),
	  document.getElementById('add-task-long')
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
      document.getElementById('task_id').value = data.task_id;
      document.getElementById('rm_task_id').value = data.task_id;

      results.textContent = "Add: " + event.target.status + " : " + event.target.response;
    });

    addRequest.setRequestHeader('Content-Type', 'application/json');
    addRequest.send(JSON.stringify(postVals));

    loadTasks();
    event.preventDefault();
}

function modalAccept(group) {
	var shortDesc = document.getElementById('add-task-short');
	var date = document.getElementById('add-task-date');
	var priority = document.getElementById('add-task-prio');
	var longDesc = document.getElementById('add-task-long');

	if(!shortDesc || !date || !priority || !longDesc){
		alert("All fields must be entered properly");
	}
	else{
		var postVals = {
      		"task_group": group,
      		"task_title": shortDesc,
      		"task_details": longDesc,
      		"task_priority": priority,
      		"date_due": date,
    	}
    	addTask(postVals);
	}
}

var acceptButton = document.getElementById('accept-modal-button');

function taskAEventHandle() {
	modalVisible();
	var group = 'A';
	acceptButton.addEventListener('click', modalAccept(group));
}

function taskBEventHandle() {
	modalVisible();
	var group = 'B';
	acceptButton.addEventListener('click', modalAccept(group));
}

function taskCEventHandle() {
	modalVisible();
	var group = 'C';
	acceptButton.addEventListener('click', modalAccept(group));
}

function taskDEventHandle() {
	modalVisible();
	var group = 'D';
	acceptButton.addEventListener('click', modalAccept(group));
}

function taskEEventHandle() {
	modalVisible();
	var group = 'E';
	acceptButton.addEventListener('click', modalAccept(group));
}

function taskDeletion(i) {
	var getTasks = document.getElementsByClassName('task-container');
	var getID = getTasks[i].dataset.id;

    var rmRequest = new XMLHttpRequest();
    rmRequest.open('GET', '/ajax/deltask/' + getID);
    rmRequest.addEventListener('load', function(event) {
    	document.getElementById('task_id').value = '';
      	document.getElementById('rm_task_id').value = '';
      	results.textContent = "Remove: " + event.target.status + " : " + event.target.response;
    });

    rmRequest.send();

    loadTasks();
    event.preventDefault();
}

window.addEventListener('DOMContentReady', function() {
	var cancelModal = document.getElementById('cancel-modal-button');
	cancelModal.addEventListener('click', modalHide);

	var addTaskA = document.getElementById('add-task-A');
	var addTaskB = document.getElementById('add-task-B');
	var addTaskC = document.getElementById('add-task-C');
	var addTaskD = document.getElementById('add-task-D');
	var addTaskE = document.getElementById('add-task-E');

	addTaskA.addEventListener('click', taskAEventHandle);
	addTaskB.addEventListener('click', taskBEventHandle);
	addTaskC.addEventListener('click', taskCEventHandle);
	addTaskD.addEventListener('click', taskDEventHandle);
	addTaskE.addEventListener('click', taskEEventHandle);

	var deleteTask = document.getElementsByClassName('remove-task');
	for(i = 0; i < deleteTask.length; i++){
		deleteTask[i].addEventListener('click', taskDeletion(i));
	}

});
