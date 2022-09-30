import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { EntertainmentType } from '../../proxies/config';
import { SearchResultScreen } from './SearchResultScreen';
import { navigateTo } from '../../App';

const queryParamWasCleanedWhileBrowsing = (queryParam: string | null, localQueryState: string) => {
    return !queryParam && localQueryState !== '';
}

const wentBackInTheBrowsingHistory = (queryParam: string | null, localQueryState: string) => {
    return (queryParam && localQueryState)
        && (queryParam !== localQueryState);
}

const movedForwardInTheBrowsingHistory = (queryParam: string | null, localQueryState: string) => {
    return queryParam && localQueryState === '';
}

const ENTERTAINMENT_TYPE = 'movie';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query');
    const [query, setQuery] = useState(queryParam || '');
    const navigate = useNavigate();

    const handleOnSearchRequest = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const currentQuery = event.currentTarget.value;
        
        if(event.key !== 'Enter' || currentQuery === '') return;

        setQuery(currentQuery);
        setSearchParams({ query: currentQuery });
    }

    const handleOnRedirectToDetailsClick = ({ target }: React.MouseEvent) => {
        if(!(target instanceof HTMLElement)) return;

        const id = target.getAttribute('data-entertainment-id');
        const type = target.getAttribute('data-entertainment-type') as EntertainmentType;

        if(!id || !type) return;

        navigate(navigateTo.entertainmentDetails(id, type));
    }

    if(queryParamWasCleanedWhileBrowsing(queryParam, query)) setQuery('');
    else if(wentBackInTheBrowsingHistory(queryParam, query)) setQuery(queryParam!);
    else if(movedForwardInTheBrowsingHistory(queryParam, query)) setQuery(queryParam!);

    return (
        <div>
            <input 
                type="search"
                placeholder='Search movies...'
                onKeyDown={handleOnSearchRequest}
            />

            <SearchResultScreen 
                query={query}
                type={ENTERTAINMENT_TYPE}
                onRedirectToDetailsClick={handleOnRedirectToDetailsClick}
            />
        </div>
    )
} 

export { Search };