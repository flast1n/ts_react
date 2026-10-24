import { useState } from "react";
import { AddTask } from "./AddTask";
import { TaskList } from "./TaskList";

export type Task = {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  category: "Work" | "Study" | "Personal";
  isCompleted: boolean;
}

export const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Вивчити React Context", priority: "high", category: "Study", isCompleted: false },
    { id: 2, title: "Вивчити Git", priority: "medium", category: "Study", isCompleted: false }
  ]);
  const [filters, setFilters] = useState("all");
  const [sorts, setSorts] = useState("default");

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(item => { 
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      } 
      return item;
    }));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(item => 
      item.id === updatedTask.id ? updatedTask : item
    ))
  }

  return (<div className="app">
        <header className="header">
          <h1 className="color">Smart Task Tracker</h1>
        </header>
        <main className="main-layout">
        <div>
          <p className="color" style={{ marginBottom: "1rem" }}>Всього завдань: {tasks.length}</p>
          <TaskList 
            tasks={tasks} 
            onDelete={handleDeleteTask} 
            onToggle={handleToggleTask} 
            onEdit={handleUpdateTask} 
          />
        </div>
        <aside>
          <AddTask tasks={tasks} onAdd={handleAddTask} />
        </aside>
      </main>
  </div>)
}