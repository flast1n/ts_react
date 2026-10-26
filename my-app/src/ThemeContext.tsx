import { createContext, useContext } from "react";
import { useLocalStorage } from "./UseLocalStorage";

type Theme = "dark" | "light";
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error ("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useLocalStorage<Theme>("my_theme", "light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    };

    return (<ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>)
};