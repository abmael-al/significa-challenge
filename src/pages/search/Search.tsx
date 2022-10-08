import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import { ENTERTAINMENT_TYPE } from '../../App';
import { SearchResultScreen } from './SearchResultScreen';
import { ReactComponent as Magnifier } from '../../assets/icons/icon-magnifier.svg';

import './index.css';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [textInput, setTextInput] = useState('');
    const query = searchParams.get('query') || '';

    const handleOnSearchRequest = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchParams({ query: textInput });
    }

    const handleOnChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(currentTarget.value);
    }

    return (
        <section className='fill-screen-accordingly'>
            <form 
                className='search__bar'
                onSubmit={handleOnSearchRequest}
            >
                <button
                    className='search__bar__button'
                    type='submit'
                >
                    <Magnifier />
                </button>
                <input 
                    className='search__bar__field'
                    type='search'
                    value={textInput}
                    placeholder='Search movies...'
                    onChange={handleOnChange}
                />
            </form>

            <SearchResultScreen 
                searchConfig={{ query: query, type: ENTERTAINMENT_TYPE }}
            />
        </section>
    )
} 
