import { MovieMap } from '../../proxies';

import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';
import { MovieDetailsScreen } from './MovieDetailsScreen';
import { MovieNotFound } from './MovieNotFound';
import { SomethingWentWrong } from '../../layout';
import { GeneralContainer, LoadingAnimation } from '../../components';

import { useParams, Link } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks';

import './index.css'

export const Movie = () => {
    const { movie_id } = useParams();
    const { 
        details, 
        isNotFound, 
        isLoading, 
        isError, 
    } = useEntertainmentDetails<MovieMap>(
        { id: movie_id as string, type: 'movie' }
    );

    const prevPageLink = window.history.state || window.history.length > 1 ? -1 : '/';

    return (
        <>
            <section>
                <GeneralContainer 
                    className='details__screen__container'
                >
                    <nav className='nav'>
                        <Link 
                            //@ts-ignore
                            to={prevPageLink}
                            className='nav__back__link'
                        >
                            <IconArrow />
                        </Link>
                    </nav>

                    {details && 
                        <MovieDetailsScreen { ...details } />
                    }

                    {isLoading &&
                        <LoadingAnimation 
                            wrapperClass='details__state__screen' 
                        />
                    }

                    {isNotFound &&
                        <MovieNotFound 
                            wrapperClass='details__state__screen'
                        />
                    }

                    {isError &&
                        <SomethingWentWrong 
                            wrapperClass='details__state__screen' 
                        />
                    }
                </GeneralContainer>
            </section>
        </>
    )
}
