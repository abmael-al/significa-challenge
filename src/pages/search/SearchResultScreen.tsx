import { useSearchEntertainmentsByTitle } from "../../hooks";
import { SearchConfig } from "../../proxies";
import { EntertainmentCardFeatures } from "./EntertainmentCardFeatures";

import { LoadingAnimation } from "../../components";

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
        // TODO: Rename to search result container
        <main className="search__result__screen">
            {entertainments &&
                <EntertainmentCardFeatures 
                    content={entertainments}
                />
            }

            {noRequestWasMadeBefore &&
                <div className="empty__state">
                    <div>
                        <figure>
                            <img 
                                src="/illustrations/illustration-empty-state.png" 
                                alt="An illustrantion used to compose an state of empty screen."
                                width='400px'
                                height='200px'
                                loading='lazy'
                            />
                        </figure>
                        <div className="empty__state__body">
                            <h1 className="empty__state__body__title">Don't know what to search?</h1>
                            <p className="empty__state__body__copy">Here's an offer you can't refuse</p>
                        </div>
                    </div>
                </div>
            }

            {isLoading && 
                <LoadingAnimation 
                    wrapperClass='search__result__loading__state' 
                />
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