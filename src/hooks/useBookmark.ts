import { useCallback } from "react";
import { useLocalStorage } from "./index";

export function useBookmark(key: string) {
    const [bookmark, setBookmark] = useLocalStorage<string[]>(key, []);
    const optBookmark = new Set(bookmark);

    const toggle = useCallback(
        (id: string) => {
            if(optBookmark.has(id)) {
                optBookmark.delete(id);
            } else {
                optBookmark.add(id);
            }

            setBookmark(Array.from(optBookmark));
        }, 
        [optBookmark]
    );

    const includes = useCallback(
        (id: string) => {
            return optBookmark.has(id);
        }, 
        [optBookmark]
    );  

    return {
        toggle, 
        includes
    };
}