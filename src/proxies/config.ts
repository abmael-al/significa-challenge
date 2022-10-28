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

export type EntertainmentRequestMap = MovieMap;

export type EntertainmentRequestMapOrError = EntertainmentRequestMap | ErrorResponse;

export interface DetailsRequestConfig {
    id: string;
    type: Entertainment;
    plot?: 'short' | 'full';
}

export interface SearchConfig {
    query: string;
    type: Entertainment;
    page?: number;
}

interface SuccessfulSearch {
    Response: 'True';
    Search: EntertainmentShortMap[];
    totalResults: string;
}
 
export type SearchResult = SuccessfulSearch | ErrorResponse;

export const MAX_NUMBER_OF_RESULTS_PER_PAGE = 10;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getEntertainmentSearchRequestUrl = 
    ({ query, type, page = 1 }: SearchConfig) => 
        `${BASE_URL}&s=${query}&page=${page}&type=${type}`;

export const getEntertainmentDetailsRequestUrl = 
    ({ id, type, plot = 'full' }: DetailsRequestConfig) => 
        `${BASE_URL}&i=${id}&type=${type}&plot=${plot}`;
