import { 
    EntertainmentShortMap, 
    SearchConfig,
    searchEntertainmentsByTitle 
} from "../proxies";

import { useEffect, useState } from "react";

const calcNumberOfPages = (totalResults: string) => {
    const MAX_NUMBER_OF_RESULTS_PER_PAGE = 10;
    return Math.ceil(
        Number.parseInt(totalResults) / MAX_NUMBER_OF_RESULTS_PER_PAGE
    );
}

interface Search {    
    results: EntertainmentShortMap[] | undefined;
    pages: number;
}

export const useSearchEntertainmentsByTitle = (config: SearchConfig) => {
    const [search, setSearch] = useState<Search>({ results: undefined, pages: 0 });
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
                        pages: calcNumberOfPages(res.totalResults)
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