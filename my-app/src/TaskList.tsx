import type { Task } from "./App";
import { useLanguage } from "./LanguageContext";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskList = ({ tasks, onDelete, onToggle, onEdit }: TaskListProps) => {
  const {t} = useLanguage();
  if (tasks.length === 0) return <p>{t.noTasks}</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};