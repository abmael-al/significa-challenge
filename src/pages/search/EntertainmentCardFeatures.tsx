import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { EntertainmentShortMap } from "../../proxies";

import { EntertainmentCard } from "./EntertainmentCard";

import { useBookmark } from "../../hooks";

interface EntertainmentCardFeaturesProps {
    content: EntertainmentShortMap[];
}

export const EntertainmentCardFeatures = ({ content }: EntertainmentCardFeaturesProps) => {
    const bookmark = useBookmark(ENTERTAINMENT_BOOKMARK_KEY);

    const handleOnToggleInBookmark = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const id = target.getAttribute('data-bookmark-id');

        if(!id) return;

        bookmark.toggle(id);
    }

    return (
        <div
            className='entertainment__cards__container'
            onClick={handleOnToggleInBookmark}
        >
            {content.map(ent => 
                <EntertainmentCard
                    key={ent.imdbID}
                    isBookmarked={bookmark.includes(ent.imdbID)}
                    { ...ent }
                />    
            )}
        </div>
    )
}
