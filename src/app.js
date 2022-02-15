import TaskList from './tasksList.js';

class App {
  constructor() {
    this.taskList = new TaskList();
  }

  displayTaskCards() {
    this.taskList.saveDataToStorage();
    const taskContainer = document.querySelector('.task-container');
    const taskTemplate = document.getElementById('task-template');
    taskContainer.innerHTML = '';
    this.taskList.taskListArray.forEach((task) => {
      const taskCard = taskTemplate.content.cloneNode(true).children[0];
      const checkBox = taskCard.querySelector('.check');
      const descriptionInput = taskCard.querySelector('.task-description');
      const taskButton = taskCard.querySelector('.row-task button');
      const deleteButton = taskCard.querySelector('.delete-btn');
      checkBox.checked = task.completed ? 'checked' : '';
      checkBox.addEventListener('change', (e) => {
        const grandParent = e.target.parentNode.parentNode;
        if (e.target.checked) {
          grandParent.querySelector('.task-description').style.textDecoration = 'line-through';
        } else {
          grandParent.querySelector('.task-description').style.textDecoration = 'none';
        }
        this.taskList.updateTaskStatus(grandParent.querySelector('.delete-btn').dataset.id, e.target.checked);
      });
      descriptionInput.value = task.description;
      taskButton.setAttribute('data-id', task.index);
      deleteButton.setAttribute('data-id', task.index);
      descriptionInput.addEventListener('input', (e) => {
        const grandParent = e.target.parentNode.parentNode;
        grandParent.style.backgroundColor = 'lightgoldenrodyellow';
        grandParent.querySelector('.delete-btn').style.display = 'block';
        grandParent.querySelector('.move-btn').style.display = 'none';
      });

      descriptionInput.addEventListener('blur', (e) => {
        const grandParent = e.target.parentNode.parentNode;
        grandParent.style.backgroundColor = 'inherit';
        const index = e.target.parentNode.parentNode.querySelector('.delete-btn').dataset.id;
        this.taskList.updateTaskDescription(index, e.target.value);
        setTimeout(() => {
          grandParent.querySelector('.delete-btn').style.display = 'none';
          grandParent.querySelector('.move-btn').style.display = 'block';
        }, 200);
      });
      deleteButton.addEventListener('click', (e) => {
        this.taskList.deleteTask(e.target.dataset.id);
        this.displayTaskCards();
      });
      taskContainer.appendChild(taskCard);
    });
  }

  AddListeners() {
    document.querySelector('.row-input input').addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        if (e.target.value === '') return;
        this.taskList.addNewTask(e.target.value);
        this.displayTaskCards();
        e.target.value = '';
        e.target.focus();
      }
    });
  }
}

export default App;