import {
    DetailsRequestConfig,
    EntertainmentDetails,
    getEntertainmentDetailsRequestUrl 
} from "./";

import fetch from "../lib/fetch";

export const getEntertainmentDetails = async <T extends EntertainmentDetails>(config: DetailsRequestConfig) => {
    const url = getEntertainmentDetailsRequestUrl(config);
    const { data } = await fetch<T>(url);

    return data;
}