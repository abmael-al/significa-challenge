import { useSearchParams } from 'react-router-dom'
import { SearchResultScreen } from './SearchResultScreen';
import { Entertainment } from '../../proxies';
import { ReactComponent as Magnifier } from '../../assets/icons/icon-magnifier.svg';

import './index.css';

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
        <section className='fill-screen-accordingly'>
            {/* TODO: Turn the search input section into a form */}
            {/* TODO: Process the search request on click */}
            <form className='search__bar'>
                <button
                    type='submit'
                    className='search__bar__button'
                >
                    <Magnifier />
                </button>
                <input 
                    type='search'
                    className='search__bar__field'
                    placeholder='Search movies...'
                    onKeyDown={handleOnSearchRequest}
                />
            </form>

            <SearchResultScreen 
                searchConfig={{ query: query, type: ENTERTAINMENT_TYPE }}
            />
        </section>
    )
} 
