import { MovieDetails } from '../../proxies/config'
import { useBookmark } from '../../hooks/index'
import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App'

type MovieDetailsScreenProps = MovieDetails;

interface BookmarkToggleProps {
    id: string;
    bookmarkKey: string;
    toggledOn: React.ReactNode;
    toggledOff: React.ReactNode;
}

const BookmarkToggle = ({ 
    id, 
    bookmarkKey,
    toggledOn = 'Added to bookmark',
    toggledOff = 'Add to bookmark',
}: BookmarkToggleProps) => {
    const bookmark = useBookmark(bookmarkKey);
 
    const onToggle = () => {
        bookmark.toggle(id);
    }

    return( 
        <button 
            onClick={onToggle}
        >
            {bookmark.includes(id)
                ? toggledOn
                : toggledOff
            }
        </button>
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
        <main> 
            <div>
                <div>
                    <p>Runtime: {Runtime}</p>
                    <p>Year: {Year}</p>
                    <p>Rated: {Rated}</p>
                </div>
                
                <h1>{Title}</h1>
                
                <div>
                    <p>IMDB rating: {imdbRating}/10</p>
                    <p>Metascore: {Metascore}%</p>

                    <BookmarkToggle 
                        id={imdbID}
                        bookmarkKey={ENTERTAINMENT_BOOKMARK_KEY}
                        toggledOn={'Added'}
                        toggledOff={'Add to favorites'}
                    />
                </div>
                
                <div>
                    <p>Plot: {Plot}</p>
                    <p>Cast: {Actors}</p>
                    <p>Genre: {Genre}</p>
                    <p>Director: {Director}</p>
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