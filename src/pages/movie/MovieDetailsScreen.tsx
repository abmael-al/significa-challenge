import { ENTERTAINMENT_BOOKMARK_KEY } from '../../App';
import { BookmarkToggle } from '../../components';
import { MovieDetails } from '../../proxies';

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
                        bookmarkKey={ENTERTAINMENT_BOOKMARK_KEY}
                        itemId={imdbID}
                        toggledOnRender='Added'
                        toggledOffRender='Add to favorites'
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