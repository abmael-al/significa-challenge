import { useParams } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks';

import { MovieDetails, Entertainment } from '../../proxies';
import { MovieDetailsScreen } from './MovieDetailsScreen';

interface MovieProps {
    onBackToSearchScreen(): void;
}

export const Movie = ({ onBackToSearchScreen }: MovieProps) => {
    const ENTERTAINMENT_TYPE: Entertainment = 'movie';
    const { id } = useParams();
    const { 
        details,
        isNotFound,
        isLoading,
        isError,
    } = useEntertainmentDetails<MovieDetails>(
        { id: id as string, type: ENTERTAINMENT_TYPE }
    );
    
    return (
        <>
            <section>
                <div>
                    <button onClick={onBackToSearchScreen}>Back</button>
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
            </section>
        </>
    )
}
