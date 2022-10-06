import { useBookmark } from '../../hooks';

interface BookmarkToggleProps {
    bookmarkKey: string;
    itemId: string;
    toggledOnRender: React.ReactNode;
    toggledOffRender: React.ReactNode;
}

export const BookmarkToggle = ({ 
    bookmarkKey,
    itemId, 
    toggledOnRender = 'Added to bookmark',
    toggledOffRender = 'Add to bookmark',
}: BookmarkToggleProps) => {
    const bookmark = useBookmark(bookmarkKey);
 
    const handleOnToggle = () => {
        bookmark.toggle(itemId);
    }

    return(
        <button 
            onClick={handleOnToggle}
        >
            {bookmark.includes(itemId)
                ? toggledOnRender
                : toggledOffRender
            }
        </button>
    )
}