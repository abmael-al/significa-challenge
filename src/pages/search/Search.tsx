import { ENTERTAINMENT_TYPE } from '../../App';

import ReactPaginate from 'react-paginate';
import { SearchResultScreen } from './SearchResultScreen';
import { GeneralContainer } from "../../components"
import { ReactComponent as Magnifier } from '../../assets/icons/icon-magnifier.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-arrow-right.svg';

import { useCallback, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom'

import './index.css';

interface PaginateProps {
    pageCount: number;
    forcePage: number;
    onPageChange(selectedItem: { selected: number }): void;
}

const Paginate = ({ pageCount, forcePage, onPageChange }: PaginateProps) => {
    const location = useLocation();

    const buildHref = (pageIndex: number, pageCount: number) => {
        const _FLAG = /page=[0-9]+/;
        const _replaceValue = `page=${pageIndex}`;
        const _shouldAddHref = pageIndex >= 1 && pageIndex <= pageCount;        
        
        return _shouldAddHref
            ? `/${location.search.replace(_FLAG, _replaceValue)}`
            : '#'
    }

    return (
        <div 
            className={pageCount > 0 ? 'paginate__container' : ''}
        >
            <ReactPaginate
                pageCount={pageCount}
                forcePage={forcePage}
                onPageChange={onPageChange}
                hrefBuilder={buildHref}
                containerClassName='paginate'
                activeLinkClassName='link--active'
                pageLinkClassName='paginate__link'
                previousLinkClassName='paginate__link'
                nextLinkClassName='paginate__link'
                disabledLinkClassName='link--disabled'
                breakLinkClassName='paginate__link'
                previousLabel={<ArrowLeft className='paginate__label' />}
                nextLabel={<ArrowRight className='paginate__label'  />}
                breakLabel={'...'}
                pageRangeDisplayed={3}
                renderOnZeroPageCount={() => null}
            />
        </div>
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

    const currentPageOffset = numberOfPages !== 0 ? search.page - 1 : -1;

    return (
        <section>
            <GeneralContainer
                className='search__screen__container'
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
