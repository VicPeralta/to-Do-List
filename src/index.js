import './style.css';

const tasksList = [
  { index: 0, completed: false, description: 'Debug weather app code' },
  { index: 1, completed: false, description: 'Prepare for StandUp meeting' },
  { index: 2, completed: true, description: 'Study documentation about WebPack' },
  { index: 3, completed: false, description: 'Organize folders' },
  { index: 4, completed: false, description: 'Finish ToDo List' },
];

function createTaskCardsUsingTemplateString() {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';
  tasksList.forEach((task) => {
    const taskRow = document.createElement('div');
    taskRow.classList.add('row', 'row-task');
    taskRow.innerHTML = `
      <div class="task">
            <input type="checkbox" class="check" ${task.completed ? 'checked' : ''}>
            <input class="task-description" type="text" value=' ${task.description}' >
          </div>
          <button data-id=${task.index}>&#8942;</button>
    `;
    taskContainer.appendChild(taskRow);
  });
}

createTaskCardsUsingTemplateString();
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

function getNewIndex() {
  let max = 0;
  tasksList.forEach((e) => {
    if (e.index > max) max = e.index;
  });
  return max + 1;
}

document.querySelector('.row-input input').addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    if (e.target.value === '') return;
    tasksList.push({ index: getNewIndex(), completed: false, description: `${e.target.value}` });
    createTaskCardsUsingTemplateString();
    e.target.value = '';
    e.target.focus();
  }
});