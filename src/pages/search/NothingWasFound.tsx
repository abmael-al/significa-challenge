import { ReactComponent as NoSearchResultIcon } from '../../assets/icons/no-search-result.svg';

interface NothingWasFoundProps {
    wrapperClass: string;
}

export const NothingWasFound = ({ wrapperClass }: NothingWasFoundProps) => {
    return (
        <div className={`nwf__container ${wrapperClass}`}>
            <div>
                <NoSearchResultIcon className='nwf__illustration' />
            </div>
            <div className='nwf__body'>
                <h1 className='nwf__title'>What're you looking for?</h1>
                <p className='nwf__supporting__text'>We searched far and wide. Unfortunately, no results were found.</p>
            </div>
        </div>
    )
}