/**
 * @jest-environment jsdom
 */
import TaskList from './src/tasksList.js';
import App from './src/app.js';

describe('Tasklist localstorage', () => {
  test('Add', () => {
    const taskList = new TaskList();
    taskList.addNewTask('New Task1');
    taskList.addNewTask('New Task2');
    expect(taskList.taskListArray.length).toBe(2);
  });
  test('Delete', () => {
    const taskList = new TaskList();
    taskList.addNewTask('New Task1');
    taskList.addNewTask('New Task2');
    taskList.deleteTask(1);
    expect(taskList.taskListArray.length).toBe(1);
  });
});

describe('DOM manipulation', () => {
  test('Add taskCard', () => {
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
    const tasks = document.body.querySelectorAll('.row-task')
    expect(tasks.length).toBe(4);
  });
});