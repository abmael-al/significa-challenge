import { MovieDetails } from '../../proxies/config'

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

                    {/* TODO: Implement "add to favorites" functionality. */}
                    <button>Add to favorites</button>
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