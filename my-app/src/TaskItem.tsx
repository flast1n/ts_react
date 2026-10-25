import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Task } from "./App";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (task: Task) => void;
}

export const TaskItem = ({task, onDelete, onToggle, onEdit}: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editPriority, setEditPriority] = useState(task.priority)
    const [editCategory, setEditCategory] = useState(task.category)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!editTitle.trim()) return;

        onEdit({
            ...task,
            title: editTitle,
            priority: editPriority,
            category: editCategory
        });
        setIsEditing(false);
    };

    return (<div className={`task-item ${task.isCompleted ? "completed" : ""}`}>
        {!isEditing ? (
            <>
            <div className="task-content">
                <input type="checkbox" checked={task.isCompleted} onChange={() => onToggle(task.id)}/>
                <div>
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                        <span className="badge category-tag">{task.category}</span>
                    </div>
                </div>
            </div>
            <div className="task-actions">
                <button className="btn btn-outline" type="button" onClick={() => setIsEditing(true)}>✏️</button>
                <button className="btn btn-danger" type="button" onClick={() => onDelete(task.id)}>🗑️</button>
            </div>
            </>
        ) : (
            <form className="task-edit-form" onSubmit={handleSubmit}>
                <input type="text" value={editTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)} />
                <select value={editPriority} onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditPriority(e.target.value as Task["priority"])}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select value={editCategory} onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditCategory(e.target.value as Task["category"])}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                </select>
                <button className="btn btn-primary" type="submit">Зберегти</button>
                <button className="btn btn-outline" type="button" onClick={() => setIsEditing(false)}>Скасувати</button>
            </form>
        )}
    </div>)
}