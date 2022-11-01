import { useEffect, useState } from "react"
import { 
    DetailsRequestConfig, 
    EntertainmentRequestMap,
    getEntertainmentDetails 
} from "../proxies"

export const useEntertainmentDetails = <T extends EntertainmentRequestMap>(config: DetailsRequestConfig<T>) => {
    const [details, setDetails] = useState<T | undefined>(undefined);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getEntertainmentDetails<T>(config)
            .then(result => {
                if(result.Response === 'True') setDetails(result as T);
                else if (result.Response === 'False') setIsNotFound(true);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);
    
    return {
        details,
        isNotFound,
        isLoading,
        isError
    };
}