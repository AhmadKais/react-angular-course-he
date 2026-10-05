function TaskItem({ task, onToggle, onDelete }) {
  const { id, text, done } = task;

  return (
    <li className={done ? "done" : ""}>
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>✕</button>
    </li>
  );
}

export default TaskItem;
