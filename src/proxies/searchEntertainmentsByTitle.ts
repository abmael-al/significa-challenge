import fetch from '../lib/fetch'

import { 
    SearchConfig,
    SearchResult,
    getEntertainmentSearchURL,
} from './config';

const searchEntertainmentsByTitle = async (config: SearchConfig) => {
    const url = getEntertainmentSearchURL(config);
    const { data } = await fetch<SearchResult>(url); 

    return data;
}

export { searchEntertainmentsByTitle };