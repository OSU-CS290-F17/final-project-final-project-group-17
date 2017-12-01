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

function modalAccept(group) {
	var shortDesc = document.getElementById('add-task-short');
	var date = document.getElementById('add-task-date');
	var priority = document.getElementById('add-task-prio');
	var longDesc = document.getElementById('add-task-long');

	if(!shortDesc || !date || !priority || !longDesc){
		alert("All fields must be entered properly");
	}
	else{
		//handle sending data to server and posting
	}
}

function taskAEventHandle() {
	modalVisible;
	var group = 'A';
	modalAccept(group);
}

function taskBEventHandle() {
	modalVisible;
	var group = 'B';
	modalAccept(group);
}

function taskCEventHandle() {
	modalVisible;
	var group = 'C';
	modalAccept(group);
}

function taskDEventHandle() {
	modalVisible;
	var group = 'D';
	modalAccept(group);
}

function taskEEventHandle() {
	modalVisible;
	var group = 'E';
	modalAccept(group);
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

});
