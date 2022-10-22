import { ReactComponent as NoSearchResultIcon } from '../../assets/icons/no-search-result.svg';
import './nothingWasFound.css';

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
                <p>We searched far and wide. Unfortunately, no results were found.</p>
            </div>
        </div>
    )
}