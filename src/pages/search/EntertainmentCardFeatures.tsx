import { useBookmark, useEventRouteNavigation } from "../../hooks";
import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { EntertainmentPresentation } from "../../proxies";
import { EntertainmentCard } from "./EntertainmentCard";

interface EntertainmentCardFeaturesProps {
    content: EntertainmentPresentation[];
}

export const EntertainmentCardFeatures = ({ content }: EntertainmentCardFeaturesProps) => {
    const { handleOnNavigateToDetails } = useEventRouteNavigation();
    const bookmark = useBookmark(ENTERTAINMENT_BOOKMARK_KEY);

    const handleOnToggleInBookmark = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const id = target.getAttribute('data-bookmark-id');

        if(!id) return;

        bookmark.toggle(id);
    }

    const handleOnClick = (event: React.MouseEvent) => {
        handleOnToggleInBookmark(event);
        handleOnNavigateToDetails(event);
    }

    return (
        <div
            onClick={handleOnClick}
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
