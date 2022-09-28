import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { SearchResultScreen } from './SearchResultScreen';

const ENTERTAINMENT_TYPE = 'movie';

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [nothingHasBeenRequestedYet, setNothingHasBeenRequestedYet] = useState(true);

    // TODO: handle the moment when the user hasn't searched anything yet. 
    // TODO: handle cleaning of the event handler.

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;

        setNothingHasBeenRequestedYet(false);
        setQuery(event.currentTarget.value);
    }

    const handleRedirect = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const entertainmentId = target.getAttribute('data-entertainment-id');
        const entertainmentType = target.getAttribute('data-entertainment-type');

        if(!entertainmentId || !entertainmentType) return;

        navigate(`/${entertainmentType}/${entertainmentId}`);
    }

    return (
        <div>
            <input 
                type="search"
                placeholder='Search movies...'
                onKeyDown={handleOnKeyDown}
            />

            <div>
                {nothingHasBeenRequestedYet &&
                    <h1>Nothing has been requested yet...</h1>
                }

                {!nothingHasBeenRequestedYet &&
                    <SearchResultScreen 
                        query={query}
                        type={ENTERTAINMENT_TYPE}
                        featureExtensionOnClickEvent={handleRedirect}
                    />
                }
            </div>
        </div>
    )
} 

export { Home };