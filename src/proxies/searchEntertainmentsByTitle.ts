import fetch from '../lib/fetch'

import { 
    SearchConfig,
    SearchResult,
    getEntertainmentSearchRequestUrl,
} from './';

export const searchEntertainmentsByTitle = async (config: SearchConfig) => {
    const url = getEntertainmentSearchRequestUrl(config);
    const { data } = await fetch<SearchResult>(url); 

    return data;
}
