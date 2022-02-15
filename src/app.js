import TaskList from './tasksList.js';

class App {
  constructor() {
    this.taskList = new TaskList();
  }

  createTaskCards() {
    const taskContainer = document.querySelector('.task-container');
    const taskTemplate = document.getElementById('task-template');
    taskContainer.innerHTML = '';
    this.taskList.taskListArray.forEach((task) => {
      const taskCard = taskTemplate.content.cloneNode(true).children[0];
      const checkBox = taskCard.querySelector('.check');
      const descriptionInput = taskCard.querySelector('.task-description');
      const taskButton = taskCard.querySelector('.row-task button');
      checkBox.checked = task.completed ? 'checked' : '';
      descriptionInput.value = task.description;
      descriptionInput.addEventListener('input', (e) => {
        const grandParent = e.target.parentNode.parentNode;
        grandParent.style.backgroundColor = 'lightgoldenrodyellow';
        grandParent.querySelector('button').innerHTML = '&#128465;';
      });
      descriptionInput.addEventListener('blur', (e) => {
        const grandParent = e.target.parentNode.parentNode;
        grandParent.style.backgroundColor = 'inherit';
        grandParent.querySelector('button').innerHTML = '&#8942;';
      });
      taskButton.setAttribute('data_id', task.index);
      taskButton.addEventListener('click', (e) => {
        if (e.target.innerHTML === '&#128465;') {
          console.log(`Deleting task: ${e.target.dataset.id}`);
        }
      });
      taskContainer.appendChild(taskCard);
    });
  }

  AddListeners() {
    document.querySelector('.row-input input').addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        if (e.target.value === '') return;
        this.taskList.addNewTask(e.target.value);
        this.createTaskCards();
        e.target.value = '';
        e.target.focus();
      }
    });
  }
}

export default App;