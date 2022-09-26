import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

const QUERY_URLS = {
  SEARCH_MOVIE_BY_TITLE_URL: (query: string) => `${BASE_URL}&type=movie&s=${query}`,
}

interface Movie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

const Home = () => {
    const [value, setValue] = useState('');
    const [movies, setMovies] = useState<Movie | undefined>(undefined);
    const navigate = useNavigate();

    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
    }

    const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;

        const { data } = await axios.get(QUERY_URLS.SEARCH_MOVIE_BY_TITLE_URL(value));

        setMovies(data.Search[0]);
    }

    const handleOnClick = ({ currentTarget }: React.MouseEvent<HTMLImageElement>) => {
        const movieId = currentTarget.getAttribute('data-movie-id');
       
        navigate(`/movie/${movieId}`);
    }

    return (
        <div>
            <input 
                type="search"
                value={value}
                placeholder='Search movies...'
                onChange={handleOnChange} 
                onKeyDown={handleOnKeyDown}
            />

            <div>
                {movies && 
                    <div>
                        <img 
                            data-movie-id={movies.imdbID}
                            onClick={handleOnClick} 
                            src={movies.Poster} 
                        />
                        <p>Title: {movies.Title}</p>
                        <p>Type: {movies.Type}</p>
                        <p>Year: {movies.Year}</p>
                        <p>Id: {movies.imdbID}</p>
                    </div>
                }
            </div>
        </div>
    )
} 

export { Home };
