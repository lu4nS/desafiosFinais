const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
	const newTaskText = newTaskInput.value.trim();
	if (newTaskText.length > 0) {
		const newTaskItem = createTaskItem(newTaskText);
		taskList.appendChild(newTaskItem);
		newTaskInput.value = '';
	}
});

function createTaskItem(text) {
	const taskItem = document.createElement('li');
	taskItem.classList.add('task-item');
	taskItem.innerHTML = `
		<div id="itemLi" title="click to expand">
			<div id="TextSpan">
				<span class="text">${text}</span>
			</div>
			<div id="botoes">
				<input type="checkbox">
				<button class="remove-btn">X</button>
			</div>
		</div>
	`;
	const checkbox = taskItem.querySelector('input[type="checkbox"]');
	const removeButton = taskItem.querySelector('.remove-btn');
	checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
			taskItem.classList.add('completed');
		} else {
			taskItem.classList.remove('completed');
		}
	});
	removeButton.addEventListener('click', () => {
		taskList.removeChild(taskItem);
	});
	taskItem.addEventListener('click', () => {
		taskItem.classList.toggle('expanded');
	});
	return taskItem;
}