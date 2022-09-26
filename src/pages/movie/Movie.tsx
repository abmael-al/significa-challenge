import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from "axios";

const BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

const QUERY_URLS = {
    GET_MOVIE_DETAILS_BY_ID: (id: string) => `${BASE_URL}&i=${id}`,
}

const Movie = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(undefined);
    const navigation = useNavigate();

    const getMovieDetails = () => {
        if (!id) return;        

        axios.get(QUERY_URLS.GET_MOVIE_DETAILS_BY_ID(id))
        .then(({ data }) => {
            setMovieDetails(data);
        });
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    const handleOnClick = () => {
        navigation('/');
    }

    console.log(movieDetails);

    return (
            <>
                <button onClick={handleOnClick}>Back</button>

                {movieDetails &&
                    <>
                        <h1>{movieDetails.Title}</h1>
                        <img 
                            src={movieDetails.Poster} 
                        />
                    </>
                }
                
                {!movieDetails &&
                    <h1>Nothing loaded yet...</h1>
                }
            </>
    )
}

export { Movie };