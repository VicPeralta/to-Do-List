/**
 * @jest-environment jsdom
 */
import TaskList from './src/tasksList.js';

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
  });
});