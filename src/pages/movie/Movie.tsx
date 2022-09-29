import { useParams, useNavigate } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks/useEntertainmentDetails';

import { MovieDetails, EntertainmentType } from '../../proxies/config';
import { MovieDetailsScreen } from './MovieDetailsScreen';

const Movie = () => {
    const ENTERTAINMENT_TYPE: EntertainmentType = 'movie';
    const { id } = useParams();
    const navigation = useNavigate();
    
    const { 
        details,
        isNotFound,
        isLoading,
        isError,
    } = useEntertainmentDetails<MovieDetails>({ id: id as string, type: ENTERTAINMENT_TYPE });
    
  
    const handleOnBackToSearchScreenClick = () => {
        navigation('/');
    }

    return (
        <div>
            <div>
                <button onClick={handleOnBackToSearchScreenClick}>Back</button>
            </div>

            {details &&
                <MovieDetailsScreen { ...details } />
            }
                
            {isNotFound &&
                <h1>Oops! Nothing found...</h1>
            }

            {isLoading &&
                <h1>Loading...</h1>
            }

            {isError &&
                <h1>Something went wrong...</h1>
            }
         </div>
    )
}

export { Movie };