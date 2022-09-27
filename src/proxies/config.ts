export interface EntertainmentPresentation {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export type EntertainmentType = 'movie' | 'series' | 'episode';

export interface SearchConfig {
    query: string;
    type: EntertainmentType;
}

interface SuccessfulSearch {
    Response: 'True';
    Search: EntertainmentPresentation[];
    totalResults: string;
}

interface UnsuccessfulSearch {
    Response: 'False';
    Error: string;
}

export type SearchResult = SuccessfulSearch | UnsuccessfulSearch;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getEntertainmentSearchURL = ({ query, type }: SearchConfig) => `${BASE_URL}&s=${query}&type=${type}`;
