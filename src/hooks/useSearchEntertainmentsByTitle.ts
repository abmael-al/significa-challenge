import { EntertainmentPresentation, SearchConfig } from "../proxies/config";
import { searchEntertainmentsByTitle } from "../proxies/searchEntertainmentsByTitle";

import { useEffect, useState } from "react";

export const useSearchEntertainmentsByTitle = (config: SearchConfig) => {
    const [entertainments, setEntertainments] = useState<EntertainmentPresentation[] | undefined>(undefined);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const clearPreviousSearch = () => {
            setEntertainments(undefined);
            setIsNotFound(false);
            setIsLoading(true);
            setIsError(false);
        }

        const somethingHasBeenRequestedBefore = entertainments || isNotFound || isError;

        if(somethingHasBeenRequestedBefore) clearPreviousSearch();
        
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