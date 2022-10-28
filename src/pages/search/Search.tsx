import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import { ENTERTAINMENT_TYPE } from '../../App';

import { SearchResultScreen } from './SearchResultScreen';
import { GeneralContainer } from "../../components"
import { ReactComponent as Magnifier } from '../../assets/icons/icon-magnifier.svg';
import ReactPaginate from 'react-paginate';

import './index.css';

const removeExtraSpace = (str: string) => {
    return str.replace(/\s+/g, ' ').trim();
}

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [textInput, setTextInput] = useState('');
    const query = searchParams.get('query') || '';
    const page = Number.parseInt(searchParams.get('page') || '0');

    const handleOnSearchRequest = 
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            const OFFSET = '1';
            const formattedTextInput = removeExtraSpace(textInput);

            setSearchParams({ 
                query: formattedTextInput, 
                page: OFFSET 
            });
        }

    const handleOnPageChange = 
        ({ selected }: { selected: number }) => {
            const offset = (selected + 1).toString();
            
            setSearchParams({ query: query, page: offset });
        }

    const handleOnTextInputChange = 
        ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
            setTextInput(currentTarget.value);
        }

    const dispatchNumberOfPages = useCallback(
        (n: number) => setNumberOfPages(n), []
    );

    const isSearchPaginable = page !== 0 && numberOfPages !== 0;
    
    return (
        <section>
            <GeneralContainer
                wrapperClass='search__screen__container'
            >
                <form 
                    className='search__bar'
                    onSubmit={handleOnSearchRequest}
                >
                    <button
                        className='search__bar__submit'
                        type='submit'
                    >
                        <Magnifier />
                    </button>
                    <input 
                        className='search__bar__field'
                        type='search'
                        value={textInput}
                        placeholder='Search movies...'
                        onChange={handleOnTextInputChange}
                    />
                </form>

                <SearchResultScreen 
                    config={{ 
                        query: query, 
                        type: ENTERTAINMENT_TYPE, 
                        page: page
                    }}
                    dispatchNumberOfPages={dispatchNumberOfPages}
                />

                {isSearchPaginable &&
                    <ReactPaginate 
                        breakLabel='...'
                        nextLabel='next >'
                        previousLabel='< previous'
                        pageCount={numberOfPages}
                        onPageChange={handleOnPageChange}
                    />
                }
            </GeneralContainer>
        </section>
    )
} 
