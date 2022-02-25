/**
 * @jest-environment jsdom
 */
import App from './src/app.js';

describe('App testing', () => {
  test('Add new task', () => {
    window.localStorage.clear();
    const app = new App();
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
    const input = document.createElement('input');
    input.value = 'New Task';
    app.addNewTask(input);
    const description = app.taskList.getDescription(1);
    expect(description).toBe('New Task');
  });
  test('change status DOM', () => {
    window.localStorage.clear();
    const app = new App();
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
    const input = document.createElement('input');
    app.addNewTask(input); // this adds nothing
    input.value = 'New Task';
    app.addNewTask(input);
    const check = document.querySelector('.check');
    check.checked = true;
    const event = new Event('change');
    check.dispatchEvent(event);
    expect(app.taskList.getStatus(1)).toBeTruthy();
    check.checked = false;
    check.dispatchEvent(event);
    expect(app.taskList.getStatus(1)).toBeFalsy();
  });
  test('removeTaskDom', () => {
    window.localStorage.clear();
    const app = new App();
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
    const input = document.createElement('input');
    input.value = 'New Task';
    app.addNewTask(input);
    expect(app.taskList.taskListArray.length).toBe(1);
    const btn = document.querySelector('.delete-btn');
    const event = new Event('click');
    btn.dispatchEvent(event);
    expect(app.taskList.taskListArray.length).toBe(0);
  });
  test('Input and Blur event handlers', () => {
    window.localStorage.clear();
    const app = new App();
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
    const input = document.createElement('input');
    input.value = 'New Task';
    app.addNewTask(input);
    expect(app.taskList.taskListArray.length).toBe(1);
    const event = new Event('input');
    const description = document.querySelector('.task-description');
    description.dispatchEvent(event);
    const blur = new Event('blur');
    description.dispatchEvent(blur);
  });
  test('Clear all button', () => {
    document.body.innerHTML = `
    <div class="main-container">
    <div class="row row-header">
      <p>Today's To Do</p>
      <button type="button">&#x2672;</button>
    </div>
    <hr>
   + <div class="row row-input">
      <input type="text" placeholder="Add to your list...">
      <button type="button">&#9166;</button>
    </div>
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
    <footer>
      <button type="button" class="clear-completed">Clear all completed</button>
    </footer>
  </div>
      `;
    window.localStorage.clear();
    const app = new App();
    app.AddListeners();
    const input = document.createElement('input');
    input.value = 'New Task';
    app.addNewTask(input);
    expect(app.taskList.taskListArray.length).toBe(1);
    app.taskList.updateTaskStatus(1, true);
    const clearAllBtn = document.querySelector('.clear-completed');
    const event = new Event('click');
    clearAllBtn.dispatchEvent(event);
    expect(app.taskList.taskListArray.length).toBe(0);
  });
  test('Add task btn', () => {
    document.body.innerHTML = `
    <div class="main-container">
    <div class="row row-header">
      <p>Today's To Do</p>
      <button type="button">&#x2672;</button>
    </div>
    <hr>
   + <div class="row row-input">
      <input type="text" placeholder="Add to your list...">
      <button type="button">&#9166;</button>
    </div>
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
    <footer>
      <button type="button" class="clear-completed">Clear all completed</button>
    </footer>
  </div>
      `;
    window.localStorage.clear();
    const app = new App();
    app.AddListeners();
    const input = document.querySelector('.row-input input');
    input.value = 'New task';
    const addBtn = document.querySelector('.row-input button');
    const event = new Event('click');
    addBtn.dispatchEvent(event);
    expect(app.taskList.taskListArray.length).toBe(1);
  });
  test('Add task key', () => {
    document.body.innerHTML = `
    <div class="main-container">
    <div class="row row-header">
      <p>Today's To Do</p>
      <button type="button">&#x2672;</button>
    </div>
    <hr>
   + <div class="row row-input">
      <input type="text" placeholder="Add to your list...">
      <button type="button">&#9166;</button>
    </div>
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
    <footer>
      <button type="button" class="clear-completed">Clear all completed</button>
    </footer>
  </div>
      `;
    window.localStorage.clear();
    const app = new App();
    app.AddListeners();
    const input = document.querySelector('.row-input input');
    input.value = 'New task';
    const event = new Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    expect(app.taskList.taskListArray.length).toBe(1);
  });
  test('Drag events', () => {
    document.body.innerHTML = `
    <div class="main-container">
    <div class="row row-header">
      <p>Today's To Do</p>
      <button type="button">&#x2672;</button>
    </div>
    <hr>
   + <div class="row row-input">
      <input type="text" placeholder="Add to your list...">
      <button type="button">&#9166;</button>
    </div>
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
    <footer>
      <button type="button" class="clear-completed">Clear all completed</button>
    </footer>
  </div>
      `;
    window.localStorage.clear();
    const app = new App();
    app.AddListeners();
    const input = document.querySelector('.row-input input');
    input.value = 'New task 1';
    const event = new Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    input.value = 'New task 2';
    input.dispatchEvent(event);
    expect(app.taskList.taskListArray.length).toBe(2);
    const source = document.querySelectorAll('.row-task')[0];
    const target = document.querySelectorAll('.row-task')[1];
    const dragStart = new Event('dragstart');
    const dragend = new Event('dragend');
    const dragenter = new Event('dragenter');
    const dragover = new Event('dragover');
    const dragleave = new Event('dragleave');
    const drop = new Event('drop');
    Object.defineProperty(dragStart, 'target', { writable: false, value: source });
    Object.defineProperty(drop, 'target', { writable: false, value: target });
    Object.defineProperty(dragend, 'target', { writable: false, value: source });
    Object.defineProperty(dragenter, 'target', { writable: false, value: target });
    Object.defineProperty(dragover, 'target', { writable: false, value: target });
    Object.defineProperty(dragleave, 'target', { writable: false, value: target });
    expect(app.taskList.getDescription(1)).toBe('New task 1');
    expect(app.taskList.getDescription(2)).toBe('New task 2');

    document.dispatchEvent(dragStart);
    document.dispatchEvent(dragenter);
    document.dispatchEvent(dragover);
    document.dispatchEvent(dragleave);
    document.dispatchEvent(dragend);

    document.dispatchEvent(drop);

    target.dispatchEvent(dragenter);
    target.dispatchEvent(dragover);
    source.dispatchEvent(dragend);
    expect(app.taskList.getDescription(1)).toBe('New task 2');
    expect(app.taskList.getDescription(2)).toBe('New task 1');
  });
});