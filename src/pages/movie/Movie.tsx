import { MovieDetails, Entertainment } from '../../proxies';

import { useParams, Link,  } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks';

import { GeneralContainer } from '../../components';
import { MovieDetailsScreen } from './MovieDetailsScreen';
import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';

import './index.css'

export const Movie = () => {
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
                <GeneralContainer>
                    <nav className='nav__bar'>
                        <Link 
                            to='/'
                            className='nav__bar__back__link'
                        >
                            <IconArrow />
                        </Link>
                    </nav>

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
                </GeneralContainer>
            </section>
        </>
    )
}
