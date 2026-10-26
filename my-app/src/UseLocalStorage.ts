import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storage, setStorage] = useState<T>(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) as T : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage));
    }, [key, storage]);

    return [storage, setStorage] as const;
};