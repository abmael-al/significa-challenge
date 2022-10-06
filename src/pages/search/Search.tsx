import { useSearchParams } from 'react-router-dom'
import { SearchResultScreen } from './SearchResultScreen';
import { Entertainment } from '../../proxies';

const ENTERTAINMENT_TYPE: Entertainment = 'movie';

interface SearchProps {
    handleOnRedirectToDetails({ target }: React.MouseEvent): void;
}
 
export const Search = ({ handleOnRedirectToDetails }: SearchProps) => {
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
                handleOnRedirectToDetails={handleOnRedirectToDetails}
            />
        </div>
    )
} 
