import {
    DetailsRequestConfig,
    EntertainmentDetails,
    getEntertainmentDetailsRequestURL 
} from "./config";

import fetch from "../lib/fetch";

export const getEntertainmentDetails = async <T extends EntertainmentDetails>(config: DetailsRequestConfig) => {
    const url = getEntertainmentDetailsRequestURL(config);
    const { data } = await fetch<T>(url);

    return data;
}