import { useBookmark } from "../../hooks"
import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App'
import { EntertainmentPresentation } from "../../proxies"
import { EntertainmentPresentationCard } from "./EntertainmentPresentationCard";

interface EntertainmentCardFeaturesProps {
    content: EntertainmentPresentation[];
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
            onClick={handleOnToggleInBookmark}
        >
            {content.map(ent => 
                <EntertainmentPresentationCard
                    key={ent.imdbID}
                    isBookmarked={bookmark.includes(ent.imdbID)}
                    { ...ent }
                />    
            )}
        </div>
    )
}
