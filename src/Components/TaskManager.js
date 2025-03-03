import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>Add Task</button>
      </div>
      <ul style={styles.list}>
        {tasks.map((t, index) => (
          <li key={index} style={styles.listItem}>
            {t} <button onClick={() => deleteTask(index)} style={styles.deleteButton}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  input: { padding: "10px", marginRight: "10px", width: "250px" },
  button: { padding: "10px", cursor: "pointer" },
  list: { listStyle: "none", padding: 0 },
  listItem: { margin: "10px 0", padding: "10px", border: "1px solid #ccc", display: "flex", justifyContent: "space-between" },
  deleteButton: { background: "red", color: "white", border: "none", cursor: "pointer" },
};

export default TaskManager;