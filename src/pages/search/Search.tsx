import { useSearchParams } from 'react-router-dom'
import { SearchResultScreen } from './SearchResultScreen';
import { EntertainmentType } from '../../proxies/config';

const ENTERTAINMENT_TYPE: EntertainmentType = 'movie';

interface SearchProps {
    onRedirectRequestToDetails({ target }: React.MouseEvent): void;
}

const Search = ({ onRedirectRequestToDetails }: SearchProps) => {
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
                onRedirectRequestToDetails={onRedirectRequestToDetails}
            />
        </div>
    )
} 

export { Search };