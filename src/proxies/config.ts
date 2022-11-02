export type Entertainment = 'movie' | 'series' | 'episode';

export interface EntertainmentShortMap {
    Poster: string;
    Title: string;
    Type: Entertainment;
    Year: string;
    imdbID: string;
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

interface Rating {
    Source: string;
    Value: string;
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

export interface DetailsRequestConfig<T extends EntertainmentRequestMap> {
    id: string;
    type: GetType<T>;
    plot?: 'short' | 'full';
}

type GetType<T> = T extends { Type: Entertainment } ? T['Type'] : never;

export interface SearchConfig {
    query: string;
    type: string;
    page?: number;
}

interface SuccessfulSearch {
    Response: 'True';
    Search: EntertainmentShortMap[];
    totalResults: string;
}
 
export type SearchResult = SuccessfulSearch | ErrorResponse;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getEntertainmentSearchRequestUrl = 
    ({ query, type, page = 1 }: SearchConfig) => {
        return `${BASE_URL}&s=${query}&page=${page}&type=${type}`;
    }

export const getEntertainmentDetailsRequestUrl = 
    <T extends EntertainmentRequestMap>(
        { id, type, plot = 'full' }: DetailsRequestConfig<T>
    ) => {
        return `${BASE_URL}&i=${id}&type=${type}&plot=${plot}`;
    }
        
export const getTotalNumberOfPages = (totalResults: string) => {
    const MAX_NUMBER_OF_RESULTS_PER_PAGE = 10;

    return Math.ceil(
        Number.parseInt(totalResults) / MAX_NUMBER_OF_RESULTS_PER_PAGE
    );
}