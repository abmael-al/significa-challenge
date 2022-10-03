import { useState } from 'react';
import { MovieDetails } from '../../proxies/config'

type MovieDetailsScreenProps = MovieDetails;

interface AddToFavoritesProps {
    imdbID: string;
}

const verify = (imdbID: string) => {
    let favorites = localStorage.getItem('favorites');

    if(!favorites) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    favorites = JSON.parse(localStorage.getItem('favorites')!);
        
    const set = new Set(favorites!);

    if(set.has(imdbID)) {
        return true;
    }
    else {
        return false;
    }
}

const AddToFavorites = ({ imdbID }: AddToFavoritesProps) => {
    const [isFavorited, setIsFavorited] = useState(verify(imdbID));

    // Get the favorites.
    // Verify if imdbID exits in the favorites.
    // Toggle enterteinment from favorites.
    // Update the favorites.

    const toggle = () => {
        let favorites = localStorage.getItem('favorites');

        favorites = JSON.parse(localStorage.getItem('favorites')!);
        
        const set = new Set(favorites!);

        if(set.has(imdbID)) {
            set.delete(imdbID);
        }
        else {
            set.add(imdbID);
        }

        localStorage.setItem('favorites', JSON.stringify(Array.from(set)));
    }

    const onToggle = () => {
        setIsFavorited(!isFavorited);
        toggle();
    }

    return( 
        <button 
            onClick={onToggle}
        >
            {isFavorited
                ? 'Added'
                : 'Add to favorites'
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

                    {/* TODO: Implement "add to favorites" functionality. */}
                    <AddToFavorites imdbID={imdbID} />
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