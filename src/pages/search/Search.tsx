import { useSearchParams } from 'react-router-dom'
import { SearchResultScreen } from './SearchResultScreen';
import { Entertainment } from '../../proxies';

const ENTERTAINMENT_TYPE: Entertainment = 'movie';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const handleOnSearchRequest = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        
        if(event.key !== 'Enter' || query === '') return;

        setSearchParams({ query: query });
    }

    return (
        <div>
            <input 
                type="search"
                placeholder='Search movies...'
                onKeyDown={handleOnSearchRequest}
            />

            <SearchResultScreen 
                searchConfig={{ query: query, type: ENTERTAINMENT_TYPE }}
            />
        </div>
    )
} 
