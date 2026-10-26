import { useTheme } from "./ThemeContext";

export const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();

    return (<div>
        <button className="btn" onClick={toggleTheme}>{theme === "light" ? "☀️" : "🌙"}</button>
    </div>)
}