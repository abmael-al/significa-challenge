import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { MovieMap } from '../../proxies';

import { ProgressiveLazyPoster } from '../../components';
import { ReactComponent as RottenTomatoesLogo } from '../../assets/logos/logo-rotten-tomatoes.svg';
import { ReactComponent as IMDBLogo } from '../../assets/logos/logo-imdb.svg';
import { ReactComponent as IconHeart } from '../../assets/icons/icon-heart.svg';

import { useBookmark } from '../../hooks';

interface BookmarkToggleProps {
    itemId: string;
}

export const BookmarkToggle = ({ itemId }: BookmarkToggleProps) => {
    const bookmark = useBookmark(ENTERTAINMENT_BOOKMARK_KEY);
    const isBookmarked = bookmark.includes(itemId);

    const handleOnToggle = () => {
        bookmark.toggle(itemId);
    }

    return(
        <button
            className={
                `details__toggler ${ isBookmarked ? 'toggled--on' : 'toggled--off' }`
            }
            onClick={handleOnToggle}
        >
            <IconHeart className='details__toggler__icon' />
            {isBookmarked ? 'Added' : 'Add to favorites' }
        </button>
    )
}

interface ParagraphsExtractedProps {
    by: string;
    from: string;
}

const ParagraphsExtracted = ({ by, from }: ParagraphsExtractedProps) => {
    return (
        <>
            {from
                .split(by)
                .map(extractedItem =>
                    <li key={extractedItem}>
                        <p>{`${extractedItem}`}</p>
                    </li>
                )
            }
        </>
    )
}

interface MovieDetailsScreenProps extends MovieMap {}

export const MovieDetailsScreen = ({ 
    Actors,
    Director,
    Metascore,
    imdbRating,
    Title,
    Plot,
    Genre,
    Poster,
    Runtime,
    Year,
    Rated,
    imdbID
}: MovieDetailsScreenProps) => {
    return (
        <main className='details__container'>
            <figure className='details__poster__wrapper'>
                <ProgressiveLazyPoster 
                    src={Poster}
                    fallbackSrc='/placeholders/no-poster-placeholder.png'
                    placeholderSrc='/placeholders/movie-card-poster-placeholder.png'
                    imgClass='details__poster'
                    alt={Title}
                />
            </figure>

            <section className='details__primary__info'>
                <header className='details__header'>
                    <p className='details__header__item'>
                        <span>{Runtime}</span>{'·'} 
                        <span>{Year}</span>{'·'} 
                        <span className='rated__label'>{Rated}</span>
                    </p>
                </header>
                
                <h1 className='details__headline'>{Title}</h1>
                
                <div className='details__layout--column'>
                    <div className='rating__label'>
                        <div className='rating__label__thumbnail thumbnail--yellow'>
                            <IMDBLogo />
                        </div>
                        <div className='rating__label__body'>
                            <p >{imdbRating !== 'N/A' ? `${imdbRating}/10` : imdbRating}</p>
                        </div>
                    </div>
                    
                    <div className='rating__label'>
                        <div className='rating__label__thumbnail thumbnail--red'>
                            <RottenTomatoesLogo />
                        </div>
                        <div className='rating__label__body'>
                            <p >{Metascore !== 'N/A' ? `${Metascore}%`: Metascore}</p>
                        </div>
                    </div>
                    
                    <BookmarkToggle itemId={imdbID} />
                </div>
                
                <div className='details__subjects__container'>
                    <div className='details__subject'>
                        <h5 className='details__subject__title'>Plot</h5>
                        <p className='line__height--body'>{Plot}</p>
                    </div> 
                    
                    <div className='details__subjects__wrapper'>
                        <div className='details__subject'>
                            <h5 className='details__subject__title'>Cast</h5>
                            <ul className='details__subject__content'>
                                <ParagraphsExtracted by=',' from={Actors} />
                            </ul>
                        </div>

                        <div className='details__subject'>
                            <h5 className='details__subject__title'>Genre</h5>
                            <ul className='details__subject__content'>
                                <ParagraphsExtracted by=',' from={Genre} />
                            </ul>
                        </div>

                        <div className='details__subject'>
                            <h5 className='details__subject__title'>Director</h5>
                            <ul className='details__subject__content'>
                                <ParagraphsExtracted by=',' from={Director} />
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 