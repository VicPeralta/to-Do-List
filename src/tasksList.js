class TaskList {
  constructor() {
    this.taskListArray = this.loadDataFromStorage();
  }

  loadDataFromStorage() {
    this.taskListArray = JSON.parse(window.localStorage.getItem('TODOLIST'));
    if (!this.taskListArray) this.taskListArray = [];
    return this.taskListArray;
  }

  saveDataToStorage() {
    window.localStorage.setItem('TODOLIST', JSON.stringify(this.taskListArray));
  }

  addNewTask(description) {
    this.taskListArray.push({
      index: this.taskListArray.length + 1,
      completed: false,
      description,
    });
  }

  deleteTask(index) {
    this.taskListArray = this.taskListArray.filter((e) => e.index !== Number(index));
    this.#reorderIndexes();
  }

  updateTaskDescription(index, description) {
    this.taskListArray[index - 1].description = description;
  }

  #reorderIndexes() {
    let index = 1;
    this.taskListArray.forEach((e) => {
      e.index = index;
      index += 1;
    });
  }
}

export default TaskList;