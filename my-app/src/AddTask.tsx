import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Task } from "./App";
import { useLanguage } from "./LanguageContext";

interface TaskProps {
    onAdd: (task: Omit<Task, "id">) => void;
}

export const AddTask = ({ onAdd }: TaskProps) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Task["priority"]>("medium");
    const [category, setCategory] = useState<Task["category"]>("Work");
    const {t} = useLanguage()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!title.trim()) return;

        onAdd({
            title: title.trim(), 
            priority, 
            category,
            isCompleted: false
        });
        
        setTitle("");
        setPriority("medium");
        setCategory("Work");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (<form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" placeholder={t.taskInput} value={title}
                onChange={handleChange}
            />
            <select value={priority} onChange={(e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as Task["priority"])}>
                <option value="low">{t.lowPriority}</option>
                    <option value="medium">{t.mediumPriority}</option>
                    <option value="high">{t.highPriority}</option>
            </select>
            <select value={category} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Task["category"])}>
                <option value="Work">{t.workCategory}</option>
                    <option value="Personal">{t.personalCategory}</option>
                    <option value="Study">{t.studyCategory}</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">{t.addButton}</button>
    </form>)
}