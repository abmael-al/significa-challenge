import {
    DetailsRequestConfig,
    EntertainmentRequestMap,
    EntertainmentRequestMapOrError,
    getEntertainmentDetailsRequestUrl 
} from "./";

import fetch from "../lib/fetch";

export const getEntertainmentDetails = async <T extends EntertainmentRequestMap>(config: DetailsRequestConfig) => {
    const url = getEntertainmentDetailsRequestUrl(config);
    const { data } = await fetch<T>(url);

    return (data as EntertainmentRequestMapOrError);
}