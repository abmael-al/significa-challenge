export type Entertainment = 'movie' | 'series' | 'episode';

export interface EntertainmentPresentation {
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

interface BasicEntertainmentDetails extends EntertainmentPresentation {
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

export interface MovieDetails extends BasicEntertainmentDetails {
    Type: 'movie';
    BoxOffice: string;
    DVD: string;
    Production: string;
}

interface UnsolicitedResponse {
    Error: string;
    Response: 'False';
}

export type EntertainmentDetails = MovieDetails | UnsolicitedResponse;

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
    Search: EntertainmentPresentation[];
    totalResults: string;
}

type UnsuccessfulSearch = UnsolicitedResponse;

export type SearchResult = SuccessfulSearch | UnsuccessfulSearch;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getEntertainmentSearchRequestUrl = ({ query, type }: SearchConfig) => `${BASE_URL}&s=${query}&type=${type}`;

export const getEntertainmentDetailsRequestUrl = ({ id, type }: DetailsRequestConfig) => `${BASE_URL}&i=${id}&type=${type}`;
