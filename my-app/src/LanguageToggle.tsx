import { useLanguage } from "./LanguageContext";

export const LanguageToggle = () => {
    const {lang, toggleLanguage} = useLanguage();

    return (<div>
        <button className="btn" onClick={toggleLanguage}>{lang === "uk" ? "🇺🇦" : "🇬🇧"}</button>
    </div>)
}