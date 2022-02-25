import TaskList from './tasksList.js';

class App {
  constructor() {
    this.taskList = new TaskList();
  }

  #createTaskCard(taskTemplate, task) {
    const taskCard = taskTemplate.content.cloneNode(true).children[0];
    const cbTaskCompleted = taskCard.querySelector('.check');
    const descriptionInput = taskCard.querySelector('.task-description');
    const deleteButton = taskCard.querySelector('.delete-btn');
    taskCard.querySelector('.move-btn').setAttribute('data-id', task.index);
    deleteButton.setAttribute('data-id', task.index);
    cbTaskCompleted.checked = task.completed ? 'checked' : '';
    descriptionInput.value = task.description;
    if (task.completed) {
      descriptionInput.classList.add('completed-task');
    }
    cbTaskCompleted.addEventListener('change', (e) => {
      const grandParent = e.target.parentNode.parentNode;
      if (e.target.checked) {
        grandParent.querySelector('.task-description').classList.toggle('completed-task');
      } else {
        grandParent.querySelector('.task-description').classList.toggle('completed-task');
      }
      this.taskList.updateTaskStatus(grandParent.querySelector('.delete-btn').dataset.id, e.target.checked);
    });
    descriptionInput.addEventListener('input', (e) => {
      const grandParent = e.target.parentNode.parentNode;
      grandParent.classList.add('selected-row');
      grandParent.querySelector('.move-btn').classList.add('hide');
      grandParent.querySelector('.delete-btn').classList.remove('hide');
    });
    descriptionInput.addEventListener('blur', (e) => {
      const grandParent = e.target.parentNode.parentNode;
      grandParent.classList.remove('selected-row');
      const index = e.target.parentNode.parentNode.querySelector('.delete-btn').dataset.id;
      this.taskList.updateTaskDescription(index, e.target.value);
      setTimeout(() => {
        grandParent.querySelector('.delete-btn').classList.add('hide');
        grandParent.querySelector('.move-btn').classList.remove('hide');
      }, 200);
    });
    deleteButton.addEventListener('click', (e) => {
      this.taskList.deleteTask(e.target.dataset.id);
      this.displayTaskCards();
    });
    return taskCard;
  }

  displayTaskCards() {
    this.taskList.saveDataToStorage();
    const taskContainer = document.querySelector('.task-container');
    const taskTemplate = document.getElementById('task-template');
    taskContainer.innerHTML = '';
    this.taskList.taskListArray.forEach((task) => {
      taskContainer.appendChild(this.#createTaskCard(taskTemplate, task));
    });
  }

  addNewTask(descriptionInput) {
    if (descriptionInput.value === '') return;
    this.taskList.addNewTask(descriptionInput.value);
    this.displayTaskCards();
    descriptionInput.value = '';
    descriptionInput.focus();
  }

  AddListeners() {
    document.querySelector('.row-input input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addNewTask(e.target);
      }
    });
    document.querySelector('.row-input button').addEventListener('click', () => {
      const e = document.querySelector('.row-input input');
      this.addNewTask(e);
    });
    document.querySelector('.clear-completed').addEventListener('click', () => {
      this.taskList.clearAllCompleted();
      this.displayTaskCards();
    });
    document.addEventListener('dragstart', (e) => {
      // Event handlers for card's drag operations
      if (e.target.matches('.row-task')) {
        e.target.classList.add('drag-start');
        this.dragSourceElement = e.target;
        this.dragSourceID = e.target.querySelector('.move-btn').dataset.id;
      }
    });
    document.addEventListener('dragend', (e) => {
      if (e.target.matches('.row-task')) {
        e.target.classList.remove('drag-start');
        e.target.classList.remove('over');
      }
    });
    document.addEventListener('dragenter', (e) => {
      if (e.target.matches('.row-task')) {
        e.target.classList.add('over');
      }
    });
    document.addEventListener('dragleave', (e) => {
      if (e.target.matches('.row-task')) {
        e.target.classList.remove('over');
      }
    });
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    document.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.target.matches('.row-task')) {
        e.stopPropagation();
        if (this.dragSourceElement !== e.target) {
          if (this.taskList.taskListArray.length < 2) return;
          this.dragTargetID = e.target.querySelector('.move-btn').dataset.id;
          this.taskList.swapPositions(this.dragTargetID, this.dragSourceID);
          e.target.classList.remove('over');
          this.displayTaskCards();
        }
      }
    });
  }
}

export default App;