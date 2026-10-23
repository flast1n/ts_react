import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { Task } from "./App";
interface TaskProps {
    task: Task;
    onAdd: (task: Task) => void
}

export const AddTask = ({task, onAdd}: TaskProps) => {
    const [title, setTitle] = useState(task.title)
    const [priority, setPriority] = useState(task.priority)
    const [category, setCategory] = useState(task.category)

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!title.trim()) return;

        onAdd({
            ...task, 
            title: title.trim(), 
            priority, 
            category });
        setTitle("");
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        if (value === "low" || value === "medium" || value === "high") {
            setPriority(value)
        }
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        if (value === "Work" || value === "Study" || value === "Personal") {
            setCategory(value)
        }
    }

    return (<form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" placeholder="Введіть назву товара: " value={title}
                onChange={handleChange}
            />
            <select value={priority} onChange={handlePriorityChange}>
                <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
            </select>
            <select value={category} onChange={handleCategoryChange}>
                <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
            </select>
        </div>
    </form>)
}