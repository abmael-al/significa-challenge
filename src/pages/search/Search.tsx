import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import { ENTERTAINMENT_TYPE } from '../../App';

import { SearchResultScreen } from './SearchResultScreen';
import { GeneralContainer } from "../../components"
import { ReactComponent as Magnifier } from '../../assets/icons/icon-magnifier.svg';
import ReactPaginate from 'react-paginate';

import './index.css';

interface PaginationProps {
    pageCount: number;
    forcePage: number;
    onPageChange(selectedItem: { selected: number }): void;
}

const Paginate = ({ pageCount, forcePage, onPageChange }: PaginationProps) => {
    {/* I abstracted it away to keep only the necessary props to 
        make the component work visible, so that the main logic 
        isn't obscured by a bunch of style-related props. */}
    return (
        <ReactPaginate
            pageCount={pageCount}
            forcePage={forcePage}
            onPageChange={onPageChange}
            
            containerClassName='paginate__container'
            activeLinkClassName='paginate__active__link'
            pageLinkClassName='paginate__page__link'
            previousLinkClassName='paginate__previous__link'
            nextLinkClassName='paginate__next__link'
            breakLinkClassName='paginate__break__link'
            breakLabel='...'
            nextLabel='>'
            previousLabel='<'
            pageRangeDisplayed={5}
            renderOnZeroPageCount={() => null}
        />
    )
}

const removeExtraSpace = (str: string) => {
    return str.replace(/\s+/g, ' ').trim();
}

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [textInput, setTextInput] = useState('');
    
    const search = {
        query: searchParams.get('query') || '',
        page: Number.parseInt(searchParams.get('page') || '0'),
        type: ENTERTAINMENT_TYPE
    }
    
    const currentPageOffset = numberOfPages !== 0 ? search.page - 1 : -1;

    const handleOnSearchRequest = 
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            setSearchParams({ 
                query: removeExtraSpace(textInput), 
                page: '1'
            });
        }

    const handleOnPageChange = 
        ({ selected: offset }: { selected: number }) => {
            setSearchParams({ 
                query: search.query, 
                page: (offset + 1).toString() 
            });
        }

    const handleOnTextInputChange = 
        ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
            setTextInput(currentTarget.value);
        }

    const dispatchNumberOfPages = useCallback(
        (n: number) => setNumberOfPages(n), []
    );

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
                    config={{ ...search }}
                    dispatchNumberOfPages={dispatchNumberOfPages}
                />

                <Paginate
                    pageCount={numberOfPages}
                    forcePage={currentPageOffset}
                    onPageChange={handleOnPageChange}
                />
            </GeneralContainer>
        </section>
    )
} 
