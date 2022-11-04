import { SearchConfig } from "../../proxies";

import { EntertainmentCardFeatures } from "./EntertainmentCardFeatures";
import { NothingWasFound } from "./NothingWasFound";
import { EmptyState } from "./EmptyState";
import { SomethingWentWrong } from "../../layout";
import { LoadingAnimation } from "../../components";

import { useSearchEntertainmentsByTitle } from "../../hooks";
import { useEffect } from "react";

interface SearchResultScreenProps {
    config: SearchConfig;
    dispatchNumberOfPages?(n: number): void;
}

export const SearchResultScreen = ({ config, dispatchNumberOfPages }: SearchResultScreenProps) => {
    const { 
        search,
        isNotFound,
        isLoading,
        isError,
    } = useSearchEntertainmentsByTitle(config);
    
    useEffect(() => {
        dispatchNumberOfPages?.(search.pages);
    }, [search.pages]);

    const noRequestWasMadeBefore = !search.results && config.query === '';

    return (
        <main className="search__result__container">
            {search.results &&
                <EntertainmentCardFeatures 
                    toWrap={search.results}
                />
            }

            {noRequestWasMadeBefore &&
                <EmptyState />
            }

            {isLoading && 
                <LoadingAnimation 
                    wrapperClass='search__state__screen state__screen--loading' 
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