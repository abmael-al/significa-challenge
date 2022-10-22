import { ReactComponent as Error404Icon } from "../../assets/icons/error-404.svg";

import './entertainmentNotFound.css';

interface EntertainmentNotFoundProps {
    wrapperClass?: string;
}

export const EntertainmentNotFound = ({ wrapperClass }: EntertainmentNotFoundProps) => {
    return (
        <div className={`enf__container ${wrapperClass}`}>
            <div>
                <Error404Icon className='enf__illustration' />
            </div>
            <div className='enf__body'>
                <h1 className='enf__title'>This wasn't supposed to happen...</h1>
                <p>Sorry, the movie you're looking for cannot be found. We've tracked the error and will get right on it.</p>
            </div>
        </div>
    )
}