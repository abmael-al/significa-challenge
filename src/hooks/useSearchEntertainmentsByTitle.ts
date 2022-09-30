import { EntertainmentPresentation, SearchConfig } from "../proxies/config";
import { searchEntertainmentsByTitle } from "../proxies/searchEntertainmentsByTitle";

import { useEffect, useState } from "react";

export const useSearchEntertainmentsByTitle = (config: SearchConfig) => {
    const [entertainments, setEntertainments] = useState<EntertainmentPresentation[] | undefined>(undefined);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const clearPreviousSearch = () => {
            setEntertainments(undefined);
            setIsNotFound(false);
            setIsError(false);
        }

        const somethingWasRequestedBefore = entertainments || isNotFound || isError;

        if(somethingWasRequestedBefore) clearPreviousSearch();
        if(config.query === '') return;

        setIsLoading(true);

        searchEntertainmentsByTitle(config)
            .then(result => {
                if(result.Response === 'True') setEntertainments(result.Search);
                else if(result.Response === 'False') setIsNotFound(true);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [config.query, config.type]);

    return { 
        entertainments, 
        isNotFound, 
        isLoading, 
        isError,
    };
}