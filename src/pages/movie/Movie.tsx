import { MovieDetails, Entertainment } from '../../proxies';

import { useParams, Link,  } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks';

import { GeneralContainer, LoadingAnimation } from '../../components';
import { MovieDetailsScreen } from './MovieDetailsScreen';
import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';

import './index.css'

export const Movie = () => {
    // TODO: Delete this redudant variable.
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
                <GeneralContainer wrapperClass='details__container'>
                    {/* TODO: Rename to "nav" */}
                    <nav className='nav__bar'>
                        <Link 
                            to='/'
                            // TODO: Rename to "nav__back__link"
                            className='nav__bar__back__link'
                        >
                            <IconArrow />
                        </Link>
                    </nav>

                    {details && 
                        <MovieDetailsScreen { ...details } />
                    }

                    {isLoading && 
                        <LoadingAnimation 
                            wrapperClass='details__loading__state' 
                        />
                    }

                    {isNotFound &&
                        <h1>Oops! Nothing found...</h1>
                    }

                    {isError &&
                        <h1>Something went wrong...</h1>
                    }
                </GeneralContainer>
            </section>
        </>
    )
}
