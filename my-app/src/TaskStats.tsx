import { useLanguage } from "./LanguageContext";
import type { Task } from "./App";

interface TaskStatsProps {
    tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
    const {t} = useLanguage();

    const total = tasks.length;
    const completed = tasks.filter(item => item.isCompleted).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (<div style={{ marginTop: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
            <span className="color">{t.progressText}</span>
            <strong className="color">{percentage}%</strong>
            <span className="color">{percentage === 100 ? t.tasksReady : null}</span>
      </div>
       <div className="progress-bar-container" style={{ background: "var(--border-color)", borderRadius: "8px", height: "10px", overflow: "hidden" }}>
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${percentage}%`, 
            background: "var(--success-color)", 
            height: "100%", 
            transition: "width 0.3s ease" 
          }} 
        />
      </div>
    </div>)
};