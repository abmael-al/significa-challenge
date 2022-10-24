export type Entertainment = 'movie' | 'series' | 'episode';

export interface EntertainmentShortMap {
    Poster: string;
    Title: string;
    Type: Entertainment;
    Year: string;
    imdbID: string;
}

interface Rating {
    Source: string;
    Value: string;
}

interface EntertainmentMap extends EntertainmentShortMap {
    Response: 'True';
    Actors: string;
    Awards: string;
    Country: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Rated: string;
    Ratings: Rating[];
    Released: string;
    Runtime: string;
    Website: string;
    Writer: string;
    imdbRating: string;
    imdbVotes: string;
}

export interface MovieMap extends EntertainmentMap {
    Type: 'movie';
    BoxOffice: string;
    DVD: string;
    Production: string;
}

interface ErrorResponse {
    Response: 'False';
    Error: string;
}


export type EntertainmentRequestMap = MovieMap | ErrorResponse;

export interface DetailsRequestConfig {
    id: string;
    type: Entertainment;
}

export interface SearchConfig {
    query: string;
    type: Entertainment;
}

interface SuccessfulSearch {
    Response: 'True';
    Search: EntertainmentShortMap[];
    totalResults: string;
}

export type SearchResult = SuccessfulSearch | ErrorResponse;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getEntertainmentSearchRequestUrl = ({ query, type }: SearchConfig) => `${BASE_URL}&s=${query}&type=${type}`;

export const getEntertainmentDetailsRequestUrl = ({ id, type }: DetailsRequestConfig) => `${BASE_URL}&i=${id}&type=${type}`;
