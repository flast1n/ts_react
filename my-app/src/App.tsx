import { useState } from "react";
import { AddTask } from "./AddTask";
import { TaskList } from "./TaskList";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useLocalStorage } from "./UseLocalStorage";

export type Task = {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  category: "Work" | "Study" | "Personal";
  isCompleted: boolean;
}

export const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("my_task", [
    { id: 1, title: "Вивчити React Context", priority: "high", category: "Study", isCompleted: false },
    { id: 2, title: "Вивчити Git", priority: "medium", category: "Study", isCompleted: false }
  ]);
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState("all");
  const [sorts, setSorts] = useState("default");
  const {t} = useLanguage();
  const {theme} = useTheme();

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(item => { 
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      } 
      return item;
    }));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(item => 
      item.id === updatedTask.id ? updatedTask : item
    ));
  };

  const filteredTasks = tasks
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(item => {
      if(filters === "active") return !item.isCompleted;
      if(filters === "completed") return item.isCompleted;
      if(filters === "high") return item.priority === "high";
      return true;
    })
    .sort((a, b) => {
      if(sorts === "alphabet") return a.title.localeCompare(b.title);
      return 0;
    });

  return (<div className={`app ${theme}`}>
        <header className="header">
          <h1 className="color">Smart Task Tracker</h1>
          <div className="header-controls">
            <LanguageToggle />
            <ThemeToggle />
        </div>
        </header>
        <main className="main-layout">
        <div>
          <p className="color" style={{ marginBottom: "1rem" }}>{t.totalTasks} {tasks.length}</p>
          <TaskList 
            tasks={filteredTasks} 
            onDelete={handleDeleteTask} 
            onToggle={handleToggleTask} 
            onEdit={handleUpdateTask} 
          />
        </div>
        <aside>
          <AddTask onAdd={handleAddTask} />
        </aside>
      </main>
  </div>)
};