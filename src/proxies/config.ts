type Entertainment = 'movie' | 'series' | 'episode';

interface EntertainmentPresentation {
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

interface MovieDetails extends BasicEntertainmentDetails {
    Type: 'movie';
    BoxOffice: string;
    DVD: string;
    Production: string;
}

interface UnsolicitedResponse {
    Error: string;
    Response: 'False';
}

type EntertainmentDetails = MovieDetails | UnsolicitedResponse;

interface DetailsRequestConfig {
    id: string;
    type: Entertainment;
}

interface SearchConfig {
    query: string;
    type: Entertainment;
}

interface SuccessfulSearch {
    Response: 'True';
    Search: EntertainmentPresentation[];
    totalResults: string;
}

type UnsuccessfulSearch = UnsolicitedResponse;

type SearchResult = SuccessfulSearch | UnsuccessfulSearch;

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

const getEntertainmentSearchURL = ({ query, type }: SearchConfig) => `${BASE_URL}&s=${query}&type=${type}`;

const getEntertainmentDetailsRequestURL = ({ id, type }: DetailsRequestConfig) => `${BASE_URL}&i=${id}&type=${type}`;

export type {
    Entertainment,
    EntertainmentPresentation,
    EntertainmentDetails,
    MovieDetails,
    DetailsRequestConfig,
    SearchConfig,
    SearchResult
}

export {
    getEntertainmentSearchURL,
    getEntertainmentDetailsRequestURL,
}