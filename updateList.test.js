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
});