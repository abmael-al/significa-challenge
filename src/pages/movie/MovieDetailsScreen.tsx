import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { BookmarkToggle } from '../../components';
import { MovieDetails } from '../../proxies';

type MovieDetailsScreenProps = MovieDetails;

interface SplittedTextProps {
    text: string;
}

const SplittedText = ({ text }: SplittedTextProps) => {
    return (
        <>
            {text
                .split(',')
                .map(item => 
                    <p>{`${item}`}</p>    
                )
            }
        </>
    )
}

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
            <div>
                <div className='details__header'>
                    <p>{Runtime}</p>
                    <p>{Year}</p>
                    <p>{Rated}</p>
                </div>
                
                <h1 className='details__title'>{Title}</h1>
                
                <div className='details__action'>
                    <p>{imdbRating}/10</p>
                    <p>{Metascore}%</p>

                    <BookmarkToggle 
                        bookmarkKey={ENTERTAINMENT_BOOKMARK_KEY}
                        itemId={imdbID}
                        toggledOnRender='Added'
                        toggledOffRender='Add to favorites'
                    />
                </div>
                
                <div className='details__topic__a'>
                    <div>
                        <h5 className='details__topic__title'>Plot</h5>
                        <p>{Plot}</p>
                    </div>
    
                    <div className='details__topic__b'>
                        <div>
                            <h5 className='details__topic__title'>Cast</h5>
                            <SplittedText text={Actors} />
                        </div>

                        <div>
                            <h5 className='details__topic__title'>Genre</h5>
                            <SplittedText text={Genre} />
                        </div>

                        <div>
                            <h5 className='details__topic__title'>Director</h5>
                            <SplittedText text={Director} />
                        </div>
                    </div>
                </div>
            </div>
            
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