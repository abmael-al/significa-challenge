import { 
    EntertainmentShortMap, 
    SearchConfig,
    searchEntertainmentsByTitle,
    getTotalNumberOfPages
} from "../proxies";

import { useEffect, useState } from "react";

interface SearchState {    
    results: EntertainmentShortMap[] | undefined;
    pages: number;
}

export const useSearchEntertainmentsByTitle = (config: SearchConfig) => {
    const [search, setSearch] = useState<SearchState>({ results: undefined, pages: 0 });
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const somethingWasRequestedBefore = !!search.results || isNotFound || isError;
        const clearPreviousSearch = () => {
            setIsNotFound(false);
            setIsError(false);
            setSearch({ 
                results: undefined, 
                pages: 0 
            });
        }

        if(somethingWasRequestedBefore) clearPreviousSearch();
        if(config.query === '') return;

        setIsLoading(true);
        searchEntertainmentsByTitle(config)
            .then(res => {
                if(res.Response === 'True') {
                    setSearch({ 
                        results: res.Search, 
                        pages: getTotalNumberOfPages(res.totalResults)
                    });
                } else if(res.Response === 'False') {
                    setIsNotFound(true);
                }
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [config.query, config.type, config.page]
    );

    return { 
        search,
        isNotFound, 
        isLoading, 
        isError,
    };
}