import { SearchConfig } from "../../proxies";

import { EntertainmentCardFeatures } from "./EntertainmentCardFeatures";
import { 
    LoadingAnimation, 
    NothingWasFound, 
    SomethingWentWrong 
} from "../../components";

import { useSearchEntertainmentsByTitle } from "../../hooks";
import { useEffect } from "react";

interface SearchResultScreenProps {
    config: SearchConfig;
    dispatchNumberOfPages(n: number): void;
}

export const SearchResultScreen = ({ config, dispatchNumberOfPages }: SearchResultScreenProps) => {
    const { 
        search,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle(config);
    
    const noRequestWasMadeBefore = !search.results && config.query === '';

    useEffect(() => {
        dispatchNumberOfPages(search.pages);
    }, [search.pages]);

    return (
        <main className="search__result__container">
            {search.results &&
                <EntertainmentCardFeatures 
                    content={search.results}
                />
            }

            {noRequestWasMadeBefore &&
                <div className="empty__state">
                    <figure
                        className="empty__state__illustration"
                    >
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
            }

            {isLoading && 
                <LoadingAnimation 
                    wrapperClass='search__state__screen' 
                />
            }

            {isNotFound &&
                <NothingWasFound 
                    wrapperClass='search__state__screen' 
                />
            }

            {isError &&
                <SomethingWentWrong 
                    wrapperClass='search__state__screen' 
                />
            }   
        </main>
    )
}