import { useSearchEntertainmentsByTitle } from "../../hooks/useSearchEntertainmentsByTitle"
import { EntertainmentPresentationCard } from "./EntertainmentPresentationCard";
import { SearchConfig } from "../../proxies/config"

type SearchResultScreenProps = SearchConfig & {
    onRedirectToDetailsClick({ target }: React.MouseEvent): void;
}

export const SearchResultScreen = ({ 
    query, 
    type, 
    onRedirectToDetailsClick
}: SearchResultScreenProps) => {
    const {
        entertainments,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle({ query: query, type: type });

    const noRequestWasMadeBefore = !entertainments && query === '';

    return (
        <main
            onClick={onRedirectToDetailsClick}
        >
            {entertainments &&
                entertainments.map(entertainment => 
                    <EntertainmentPresentationCard
                        key={entertainment.imdbID}
                        { ...entertainment }
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
        </main>
    )
}