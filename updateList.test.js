/**
 * @jest-environment jsdom
 */
import TaskList from './src/tasksList.js';
import App from './src/app.js';

describe('update descriptions and statuses in the local storage', () => {
  test('updates task description', () => {
    const taskList = new TaskList();
    taskList.addNewTask('New Task1');
    taskList.updateTaskDescription(1, 'edited task 1');
    expect(taskList.getDescription(1)).toBe('edited task 1');
  });

  test('updates task completed status', () => {
    const taskList = new TaskList();
    taskList.addNewTask('New Task1');
    taskList.updateTaskStatus(1, true);
    expect(taskList.getStatus(1)).toBeTruthy();
  });

  test('Clear all completed from Local Storage', () => {
    window.localStorage.clear();
    const taskList = new TaskList();
    taskList.addNewTask('New Task1');
    taskList.addNewTask('New Task2');
    taskList.updateTaskStatus(1, true);
    taskList.clearAllCompleted();
    const size = taskList.taskListArray.length;
    expect(size).toBe(1);
  });
});

describe('update descriptions and statuses in the DOM', () => {
  test('updates task description in the DOM', () => {
    window.localStorage.clear();
    document.body.innerHTML = `
       <template id="task-template" >
      <div class="row row-task" draggable="true">
        <div class="task">
          <input type="checkbox" class="check">
          <input class="task-description" type="text">
        </div>
        <button class='move-btn' type="button">&#8942;</button>
        <button class='delete-btn hide' type="button">&#128465;</button>
      </div>
    </template>
    <div class="task-container">
    </div>
    `;
    const app = new App();
    app.taskList.addNewTask('Task 1');
    app.taskList.addNewTask('Task 2');
    app.taskList.addNewTask('Task 3');
    app.taskList.addNewTask('Task 4');
    app.displayTaskCards();
    app.taskList.updateTaskDescription(1, 'edited task 1');
    app.displayTaskCards();
    const tasks = document.body.querySelectorAll('.row-task');
    const description = tasks[0].querySelector('.task-description').value;
    expect(description).toBe('edited task 1');
  });

  test('updates task completed status (Checkbox is checked)', () => {
    document.body.innerHTML = `
       <template id="task-template" >
      <div class="row row-task" draggable="true">
        <div class="task">
          <input type="checkbox" class="check">
          <input class="task-description" type="text">
        </div>
        <button class='move-btn' type="button">&#8942;</button>
        <button class='delete-btn hide' type="button">&#128465;</button>
      </div>
    </template>
    <div class="task-container">
    </div>
    `;
    window.localStorage.clear();
    const app = new App();
    app.taskList.addNewTask('Task 1');
    app.taskList.addNewTask('Task 2');
    app.taskList.addNewTask('Task 3');
    app.taskList.addNewTask('Task 4');
    app.displayTaskCards();
    app.taskList.updateTaskStatus(1, true);
    app.displayTaskCards();
    const tasks = document.body.querySelectorAll('.row-task');
    const status = tasks[0].querySelector('.check').checked;
    expect(status).toBeTruthy();
  });

  test('Clear all completed from the DOM', () => {
    document.body.innerHTML = `
       <template id="task-template" >
      <div class="row row-task" draggable="true">
        <div class="task">
          <input type="checkbox" class="check">
          <input class="task-description" type="text">
        </div>
        <button class='move-btn' type="button">&#8942;</button>
        <button class='delete-btn hide' type="button">&#128465;</button>
      </div>
    </template>
    <div class="task-container">
    </div>
    `;
    window.localStorage.clear();
    const app = new App();
    app.taskList.addNewTask('Task 1');
    app.taskList.addNewTask('Task 2');
    app.taskList.addNewTask('Task 3');
    app.taskList.addNewTask('Task 4');
    app.displayTaskCards();
    app.taskList.updateTaskStatus(1, true);
    app.taskList.updateTaskStatus(2, true);
    app.taskList.updateTaskStatus(3, true);
    app.displayTaskCards();
    app.taskList.clearAllCompleted();
    app.displayTaskCards();
    const tasksCardCount = document.body.querySelectorAll('.row-task').length;
    expect(tasksCardCount).toBe(1);
  });
});