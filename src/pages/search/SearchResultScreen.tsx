import { useSearchEntertainmentsByTitle } from "../../hooks"
import { SearchConfig } from "../../proxies"
import { EntertainmentCardFeatures } from "./EntertainmentCardFeatures";

interface SearchResultScreenProps {
    searchConfig: SearchConfig;
}

export const SearchResultScreen = ({ searchConfig }: SearchResultScreenProps) => {
    const { 
        entertainments,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle(searchConfig);
    
    const noRequestWasMadeBefore = !entertainments && searchConfig.query === '';

    return (
        <main>
            <div>
                {entertainments &&
                    <EntertainmentCardFeatures 
                        content={entertainments}
                    />
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