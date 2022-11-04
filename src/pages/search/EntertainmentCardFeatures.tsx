import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { EntertainmentShortMap } from "../../proxies";

import { EntertainmentCard } from "./EntertainmentCard";

import { useBookmark } from "../../hooks";

interface EntertainmentCardFeaturesProps {
    toWrap: EntertainmentShortMap[];
}

export const EntertainmentCardFeatures = ({ toWrap }: EntertainmentCardFeaturesProps) => {
    const bookmark = useBookmark(ENTERTAINMENT_BOOKMARK_KEY);

    const handleOnToggleInBookmark = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const id = target.getAttribute('data-bookmark-id');

        if(!id) return;

        bookmark.toggle(id);
    }

    return (
        <div
            className='cards__container'
            onClick={handleOnToggleInBookmark}
        >
            {toWrap.map(ent => 
                <EntertainmentCard
                    { ...ent }
                    key={ent.imdbID}
                    isBookmarked={bookmark.includes(ent.imdbID)}
                />    
            )}
        </div>
    )
}
