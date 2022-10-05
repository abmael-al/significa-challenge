import { useLocalStorage } from "./";

export function useBookmark(key: string) {
    const [bookmark, setBookmark] = useLocalStorage<string[]>(key, []);
    const optBookmark = new Set(bookmark);

    return {
        toggle(id: string) {
            if(optBookmark.has(id)) {
                optBookmark.delete(id);
            } else {
                optBookmark.add(id);
            }
    
            setBookmark(Array.from(optBookmark));
        },
    
        includes(id: string) {
            return optBookmark.has(id);
        }
    };
}