import './style.css';

const tasksList = [
  { index: 0, completed: false, description: 'Debug weather app code' },
  { index: 1, completed: false, description: 'Prepare for StandUp meeting' },
  { index: 2, completed: true, description: 'Study documentation about WebPack' },
  { index: 3, completed: false, description: 'Organize folders' },
  { index: 4, completed: false, description: 'Finish ToDo List' },
];

function createTaskCards() {
  const taskContainer = document.querySelector('.task-container');
  const taskTemplate = document.getElementById('task-template');
  tasksList.forEach((task) => {
    const taskCard = taskTemplate.content.cloneNode(true).children[0];
    taskCard.querySelector('.check').checked = task.completed ? 'checked' : '';
    taskCard.querySelector('.task-description').value = task.description;
    taskCard.querySelector('.row-task button').setAttribute('data_id', task.index);
    taskContainer.appendChild(taskCard);
  });
}

createTaskCards();
const tasks = document.querySelectorAll('.task-description');
tasks.forEach((task) => {
  task.addEventListener('input', (e) => {
    const grandParent = e.target.parentNode.parentNode;
    grandParent.style.backgroundColor = 'lightgoldenrodyellow';
    grandParent.querySelector('button').innerHTML = '&#128465;';
  });
  task.addEventListener('blur', (e) => {
    const grandParent = e.target.parentNode.parentNode;
    grandParent.style.backgroundColor = 'inherit';
  });
});
