import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { MovieDetails } from '../../proxies';

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
                `bookmark__toggle ${ isBookmarked ? 'toggled--on' : 'toggled--off' }`
            }
            onClick={handleOnToggle}
        >
            {isBookmarked
                ? <> <IconHeart className='bookmark__toggle__icon' /> {'Added'} </> 
                : <> <IconHeart className='bookmark__toggle__icon' /> {`Add to favorites`} </> 
            }
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

type MovieDetailsScreenProps = MovieDetails;

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
        <main className='details__screen'> 
            <section className='details__primary__info'>
                <header className='details__header'>
                    <p>{Runtime}</p>
                    <p>{Year}</p>
                    <p>{Rated}</p>
                </header>
                
                <h1 className='details__headline'>{Title}</h1>
                
                <div className='details__action'>
                    <div className='details__label'>
                        <div className='details__label__thumbnail thumbnail--yellow'>
                            <IMDBLogo />
                        </div>
                        <p className='details__label__body'>{imdbRating}/10</p>
                    </div>
                    
                    <div className='details__label'>
                        <div className='details__label__thumbnail thumbnail--red'>
                            <RottenTomatoesLogo />
                        </div>
                        <p className='details__label__body'>{Metascore}%</p>
                    </div>

                    <BookmarkToggle itemId={imdbID} />
                </div>
                
                <div className='details__subject__container'>
                    <div className='details__subject'>
                        <h5 className='details__subject__title'>Plot</h5>
                        <p>{Plot}</p>
                    </div> 
                    
                    <div className='details__subject__wrapper'>
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
            
            <div>
                <img 
                    src={Poster} 
                    alt={Title}
                    loading='lazy' 
                />
            </div>
        </main>
    )
} 