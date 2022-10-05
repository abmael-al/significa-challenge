import { useSearchEntertainmentsByTitle, useBookmark } from "../../hooks"
import { EntertainmentPresentationCard } from "./EntertainmentPresentationCard";
import { SearchConfig } from "../../proxies"
import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App'

interface SearchResultScreenProps {
    searchConfig: SearchConfig;
    onRedirectRequestToDetails({ target }: React.MouseEvent): void;
}

export const SearchResultScreen = ({ 
    searchConfig,
    onRedirectRequestToDetails,
}: SearchResultScreenProps) => {
    const { 
        entertainments,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle(searchConfig);
    
    const bookmark = useBookmark(ENTERTAINMENT_BOOKMARK_KEY);

    const handleOnToggleInBookmark = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const id = target.getAttribute('data-bookmark-id');

        if(!id) return;

        bookmark.toggle(id);
    }

    const noRequestWasMadeBefore = !entertainments && searchConfig.query === '';

    return (
        <main
            onClick={onRedirectRequestToDetails}
        >
            <div
                onClick={handleOnToggleInBookmark}
            >
                {entertainments &&
                    entertainments.map(ent => 
                        <EntertainmentPresentationCard
                            key={ent.imdbID}
                            isBookmarked={bookmark.includes(ent.imdbID)}
                            { ...ent }
                        />    
                    )
                }

                {noRequestWasMadeBefore &&
                    <h1>Nothing has been requested yet...</h1>
                }

                {isLoading &&
                    <h1>Loading...</h1>
                }

                {isNotFound &&
                    <h1>Nothing found...</h1>
                }

                {isError &&
                    <h1>Some error ocurred...</h1>
                }   
            </div>
        </main>
    )
}