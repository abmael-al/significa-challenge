import { MovieMap } from '../../proxies';

import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';
import { MovieDetailsScreen } from './MovieDetailsScreen';
import { EntertainmentNotFound } from './EntertainmentNotFound';
import { SomethingWentWrong } from '../../layout';
import { GeneralContainer, LoadingAnimation } from '../../components';

import { useParams, Link } from 'react-router-dom'
import { useEntertainmentDetails } from '../../hooks';

import './index.css'

export const Movie = () => {
    const { id } = useParams();
    const { 
        details, 
        isNotFound, 
        isLoading, 
        isError, 
    } = useEntertainmentDetails<MovieMap>(
        { id: id as string, type: 'movie' }
    );

    const PREV_PAGE_LINK = window.history.state || window.history.length > 1 ? -1 : '/';

    return (
        <>
            <section>
                <GeneralContainer 
                    wrapperClass='details__screen__container'
                >
                    <nav className='nav'>
                        <Link 
                            //@ts-ignore
                            to={PREV_PAGE_LINK}
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
                        <EntertainmentNotFound 
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
