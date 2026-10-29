import type { ChangeEvent } from "react";
import { useLanguage } from "./LanguageContext";
import type { FilterType, SortType } from "./App";

interface TaskFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    sort: SortType;
    onSortChange: (sort: SortType) => void;
}

export const TaskFilters = ({ search, onSearchChange, filter, onFilterChange, sort, onSortChange }: TaskFiltersProps) => {
    const { t } = useLanguage();

    return (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div className="form-group">
                <input 
                    type="text" 
                    value={search} 
                    placeholder={t.searchPlaceholder}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                />
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <button 
                    className={`btn ${filter === "all" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => onFilterChange("all")}
                >
                    {t.filterAll}
                </button>
                <button 
                    className={`btn ${filter === "active" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => onFilterChange("active")}
                >
                    {t.filterActive}
                </button>
                <button 
                    className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => onFilterChange("completed")}
                >
                    {t.filterCompleted}
                </button>
                <button 
                    className={`btn ${filter === "high" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => onFilterChange("high")}
                >
                    {t.filterHigh}
                </button>
            </div>

            <select 
                value={sort} 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as SortType)}
            >
                <option value="default">{t.sortDefault}</option>
                <option value="alphabet">{t.sortAlphabet}</option>
                <option value="priority">{t.sortPriority}</option>
            </select>
        </div>
    );
};