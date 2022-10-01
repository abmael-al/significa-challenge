import { useEffect, useState } from "react"
import { DetailsRequestConfig, EntertainmentDetails } from "../proxies/config"
import { getEntertainmentDetails } from "../proxies/getEntertainmentDetails"

export const useEntertainmentDetails = <T extends EntertainmentDetails>(config: DetailsRequestConfig) => {
    const [details, setDetails] = useState<T | undefined>(undefined);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getEntertainmentDetails<T>(config)
            .then(result => {
                if(result.Response === 'True') setDetails(result);
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