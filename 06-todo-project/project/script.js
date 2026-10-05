// 1. The data - an array of task objects
let tasks = [
  { id: 1, text: "Learn HTML", done: true },
  { id: 2, text: "Learn CSS", done: true },
  { id: 3, text: "Learn JavaScript", done: false },
];

// 2. Find the elements on the page
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const summary = document.getElementById("summary");
const clearButton = document.getElementById("clear-btn");

// 3. Turn ONE task object into the HTML of one row
const taskToHtml = (task) => {
  const { id, text, done } = task;

  return `
    <li class="${done ? "done" : ""}">
      <input type="checkbox" ${done ? "checked" : ""} onchange="toggleTask(${id})">
      <span>${text}</span>
      <button onclick="deleteTask(${id})">✕</button>
    </li>
  `;
};

// 4. Draw the page from the data
const render = () => {
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet - add one above!</p>";
  } else {
    taskList.innerHTML = tasks.map(taskToHtml).join("");
  }

  const left = tasks.filter((task) => !task.done).length;
  summary.textContent = `${left} of ${tasks.length} tasks left`;
};

// 5. The actions - each one makes a NEW array, then draws again
const addTask = (text) => {
  const newTask = { id: Date.now(), text: text, done: false };
  tasks = [...tasks, newTask];
  render();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
  render();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  render();
};

const clearDone = () => {
  tasks = tasks.filter((task) => !task.done);
  render();
};

// 6. Events
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
});

clearButton.addEventListener("click", clearDone);

// 7. Draw for the first time
render();
