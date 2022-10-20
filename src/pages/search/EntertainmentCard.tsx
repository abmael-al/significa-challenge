import { EntertainmentPresentation } from "../../proxies";
import { navigateTo } from "../../App";

import { Link } from "react-router-dom";
import { ReactComponent as IconHeart } from "../../assets/icons/icon-heart.svg";
import { ProgressiveLazyPoster } from "./ProgressiveLazyPoster";

interface ActionButtonProps {
    id: string;
    isBookmarked: boolean;
}

const ActionButton = ({ id, isBookmarked }: ActionButtonProps) => {
    return (
        <button
            className='movie__card__action'
            data-bookmark-id={id}
            tabIndex={0}
        >
            {isBookmarked 
                ? <IconHeart className='icon__heart--filled pointer-events-none' />
                : <IconHeart className='icon__heart--outlined--active pointer-events-none' />
            }
        </button>
    )
}

interface EntertainmentCardProps extends EntertainmentPresentation {
    isBookmarked: boolean;
};

export const EntertainmentCard = ({
    Poster,
    Title,
    Year,
    Type,
    imdbID,
    isBookmarked,
}: EntertainmentCardProps) => {
    return (
        <div className='movie__card'>
            <div>
                {/* TODO: It would be optimal if i were able to reuse this component throughout the system. */}
                <ProgressiveLazyPoster 
                    src={Poster}
                    alt={Title}
                />
            </div>

            <div>
                {isBookmarked && 
                    <ActionButton id={imdbID} isBookmarked={true} />
                }

                <div className='movie__card__body'>
                    <Link 
                        to={navigateTo.details(imdbID, Type)} 
                        className='movie__card__link' 
                    />

                    {!isBookmarked && 
                        <ActionButton id={imdbID} isBookmarked={false} />
                    }

                    <div className='movie__card__supporting__text pointer-events-none'>
                        <h3 className='movie__card__title'>{Title}</h3>
                        <p>{Year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}