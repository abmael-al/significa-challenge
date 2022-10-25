import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg';
import './somethingWentWrong.css';

interface SomethingWentWrongProps {
    wrapperClass?: string;
}

export const SomethingWentWrong = ({ wrapperClass }: SomethingWentWrongProps) => {
    return (
        <div className='sww__container'>
            <div>
                <ErrorIcon className='sww__illustration' />
            </div>
            <div className={`sww__body ${wrapperClass}`}>
                <h1 className='sww__title'>Well, this is awkward</h1>
                <p className='sww__supporting__text'>Please, try again. If the error persists, send us a report or come back later.</p>
            </div>
        </div>
    )
}