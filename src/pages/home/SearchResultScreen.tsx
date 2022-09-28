import { useSearchEntertainmentsByTitle } from "../../hooks/useSearchEntertainmentsByTitle"
import { EntertainmentPresentationCard } from "./EntertainmentPresentationCard";
import { SearchConfig } from "../../proxies/config"

type SearchResultScreenProps = SearchConfig & {
    featureExtensionOnClickEvent({ target }: React.MouseEvent): void;
}

export const SearchResultScreen = ({ 
    query, 
    type, 
    featureExtensionOnClickEvent
}: SearchResultScreenProps) => {
    const {
        entertainments,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle({ query: query, type: type });

    return (
        <main
            onClick={featureExtensionOnClickEvent}
        >
            {entertainments &&
                entertainments.map(entertainment => 
                    <EntertainmentPresentationCard
                        key={entertainment.imdbID}
                        { ...entertainment }
                    />    
                )
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