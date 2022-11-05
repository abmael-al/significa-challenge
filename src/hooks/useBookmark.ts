import { useLocalStorage } from 'usehooks-ts'

export function useBookmark(key: string) {
    const [bookmarkItems, setBookmarkItems] = useLocalStorage<string[]>(key, []);
    const bookmark = new Set(bookmarkItems);
    const features = {
        toggle(id: string) {
            if(bookmark.has(id)) {
                bookmark.delete(id)
            } else {
                bookmark.add(id);
            }

            setBookmarkItems(Array.from(bookmark));
        },
    
        includes(id: string) {
            return bookmark.has(id);
        },
    }

    return features;
}