import { MovieMap } from '../../proxies';

import { MovieDetailsScreen } from './MovieDetailsScreen';
import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';
import { 
    GeneralContainer, 
    LoadingAnimation, 
    SomethingWentWrong,
    EntertainmentNotFound 
} from '../../components';

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
        
    return (
        <>
            <section>
                <GeneralContainer 
                    wrapperClass='details__screen__container'
                >
                    <nav className='nav'>
                        <Link 
                            to='/'
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
