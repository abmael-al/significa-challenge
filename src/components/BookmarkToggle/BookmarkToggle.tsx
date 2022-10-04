import { useBookmark } from '../../hooks';

interface BookmarkToggleProps {
    id: string;
    bookmarkKey: string;
    toggledOn: React.ReactNode;
    toggledOff: React.ReactNode;
}

export const BookmarkToggle = ({ 
    id, 
    bookmarkKey,
    toggledOn = 'Added to bookmark',
    toggledOff = 'Add to bookmark',
}: BookmarkToggleProps) => {
    const bookmark = useBookmark(bookmarkKey);
 
    const onToggle = () => {
        bookmark.toggle(id);
    }

    return( 
        <button 
            onClick={onToggle}
        >
            {bookmark.includes(id)
                ? toggledOn
                : toggledOff
            }
        </button>
    )
}