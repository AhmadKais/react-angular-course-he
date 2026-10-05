import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

function App() {
  // 1. The data - React remembers it between draws
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn HTML", done: true },
    { id: 2, text: "Learn CSS", done: true },
    { id: 3, text: "Learn JavaScript", done: false },
  ]);
  const [text, setText] = useState("");

  // 2. The actions - each one gives React a NEW array
  const addTask = (event) => {
    event.preventDefault();

    if (text.trim() === "") {
      return;
    }

    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  // 3. What we show - calculated from the data on every draw
  const left = tasks.filter((task) => !task.done).length;

  return (
    <div className="app">
      <h1>My Tasks</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="What do you need to do?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <p>
        {left} of {tasks.length} tasks left
      </p>

      {tasks.length === 0 ? (
        <p>No tasks yet - add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      <button className="secondary" onClick={clearDone}>
        Clear done tasks
      </button>
    </div>
  );
}

export default App;
