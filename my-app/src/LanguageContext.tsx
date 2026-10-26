import { createContext, useContext } from "react";
import { useLocalStorage } from "./UseLocalStorage";

type Language = "uk" | "en";
type Translation = Record<string, string>
interface LanguageContextType {
    lang: Language;
    toggleLanguage: () => void;
    t: Translation;
}
export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
    const [lang, setLang] = useLocalStorage<Language>("my_lang", "uk" );

    const toggleLanguage = () => {
    setLang(lang === "uk" ? "en" : "uk");
  };

    const dictionary: Record<Language, Translation> = {
        uk: {
            totalTasks: "Всього завдань:",
            taskInput: "Назва завдання...",
            lowPriority: "Низький пріоритет",
            mediumPriority: "Середній пріоритет",
            highPriority: "Високий пріоритет",
            workCategory: "Робота",
            personalCategory: "Особисте",
            studyCategory: "Навчання",
            saveButton: "Зберегти",
            cancelButton: "Скасувати",
            addButton: "Додати завдання",
            noTasks: "Список завдань порожній",
            easyDifficulty: "Низький",
            mediumDifficulty: "Середній",
            highDifficulty: "Високий",
            searchPlaceholder: "Пошук завдань...",
            filterAll: "Усі",
            filterActive: "Активні",
            filterCompleted: "Виконані",
            filterHigh: "🔥 Важливі",
            sortDefault: "За датою",
            sortAlphabet: "За алфавітом",
            sortPriority: "За пріоритетом",
            progressText: "Прогрес виконання:",
            tasksReady: "Всі завдання виконані!"
        },
        en: {
            totalTasks: "Total tasks:",
            taskInput: "Task name...",
            lowPriority: "Low priority",
            mediumPriority: "Medium priority",
            highPriority: "High priority",
            workCategory: "Work",
            personalCategory: "Personal",
            studyCategory: "Study",
            saveButton: "Save",
            cancelButton: "Cancel",
            addButton: "Add task",
            noTasks: "Task list is empty",
            easyDifficulty: "Low",
            mediumDifficulty: "Medium",
            highDifficulty: "High",
            searchPlaceholder: "Search tasks...",
            filterAll: "All",
            filterActive: "Active",
            filterCompleted: "Completed",
            filterHigh: "🔥 High Priority",
            sortDefault: "By date",
            sortAlphabet: "Alphabetical",
            sortPriority: "By priority",
            progressText: "Completion progress:",
            tasksReady: "All tasks are completed!"
        }
    };

    const t: Translation = dictionary[lang];

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
};