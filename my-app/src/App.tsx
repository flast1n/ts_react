import { useState } from "react";
import { AddTask } from "./AddTask";
import { TaskList } from "./TaskList";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useLocalStorage } from "./UseLocalStorage";
import { TaskStats } from "./TaskStats";
import { TaskFilters } from "./TaskFilters";

export type FilterType = "all" | "active" | "completed" | "high";
export type SortType = "default" | "alphabet" | "priority";
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
  const [filter, setFilters] = useState<FilterType>("all");
  const [sort, setSorts] = useState<SortType>("default");
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

  const priorityWeight: Record<Task["priority"], number> = {high: 3, medium: 2, low: 1};

  const filteredTasks = tasks
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(item => {
      if(filter === "active") return !item.isCompleted;
      if(filter === "completed") return item.isCompleted;
      if(filter === "high") return item.priority === "high";
      return true;
    })
    .sort((a, b) => {
      if(sort === "alphabet") return a.title.localeCompare(b.title);
      if(sort === "priority") return priorityWeight[b.priority] - priorityWeight[a.priority]
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
          <TaskFilters 
            search={search} 
            onSearchChange={setSearch} 
            filter={filter} 
            onFilterChange={setFilters} 
            sort={sort} 
            onSortChange={setSorts} 
          />
          <TaskList 
            tasks={filteredTasks} 
            onDelete={handleDeleteTask} 
            onToggle={handleToggleTask} 
            onEdit={handleUpdateTask} 
          />
          <TaskStats tasks={tasks}/>
        </div>
        <aside>
          <AddTask onAdd={handleAddTask} />
        </aside>
      </main>
  </div>)
};