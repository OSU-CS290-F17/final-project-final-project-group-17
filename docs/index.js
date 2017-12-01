<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.js"></script>
<script src="/groupTemplate.js"></script>

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

function taskAEventHandle() {
	modalVisible;
	var group = 'A';
}

var cancelModal = document.getElementById('cancel-modal-button');
cancelModal.addEventListener('click', modalHide);

var addTaskA = document.getElementById('add-task-A');
var addTaskB = document.getElementById('add-task-B');
var addTaskC = document.getElementById('add-task-C');
var addTaskD = document.getElementById('add-task-D');
var addTaskE = document.getElementById('add-task-E');

addTaskA.addEventListener('click', taskAEventHandle);