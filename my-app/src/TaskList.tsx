import type { Task } from "./App";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskList = ({ tasks, onDelete, onToggle, onEdit }: TaskListProps) => {
  if (tasks.length === 0) return <p>Тут поки нічого немає</p>;

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