import { ButtonHTMLAttributes } from 'react';
import { useBookmark } from '../../hooks';

interface BookmarkToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    ...rest
}: BookmarkToggleProps) => {
    const bookmark = useBookmark(bookmarkKey);
 
    const handleOnToggle = () => {
        bookmark.toggle(itemId);
    }

    return(
        <button 
            onClick={handleOnToggle}
            { ...rest }
        >
            {bookmark.includes(itemId)
                ? toggledOnRender
                : toggledOffRender
            }
        </button>
    )
}