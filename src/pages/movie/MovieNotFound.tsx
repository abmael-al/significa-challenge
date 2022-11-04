import { ReactComponent as Error404Icon } from "../../assets/icons/error-404.svg";

interface MovieNotFoundProps {
    wrapperClass?: string;
}

export const MovieNotFound = ({ wrapperClass }: MovieNotFoundProps) => {
    return (
        <div className={`enf__container ${wrapperClass}`}>
            <div> 
                <Error404Icon className='enf__illustration' />
            </div>
            <div className='enf__body'>
                <h1 className='enf__title'>You weren't supposed to see this</h1>
                <p className='enf__supporting__text'>Sorry, looks like the movie you're looking for cannot be found.</p>
            </div>
        </div>
    )
}