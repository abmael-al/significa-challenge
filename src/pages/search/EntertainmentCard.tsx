import { EntertainmentPresentation } from "../../proxies";
import { navigateTo } from "../../App";

import { Link } from "react-router-dom";
import { ReactComponent as IconHeart } from "../../assets/icons/icon-heart.svg";

import { useState } from "react";

type EntertainmentCardProps = EntertainmentPresentation & {
    isBookmarked: boolean;
};

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

export const EntertainmentCard = ({
    Poster,
    Title,
    Year,
    Type,
    imdbID,
    isBookmarked,
}: EntertainmentCardProps) => {
    const [isFallbackPoster, setIsFallbackPoster] = useState(false);

    const FALLBACK_IMAGE = '/illustrations/illustration-empty-state.png';
    
    const handleImageOnError = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>) => {
        currentTarget.src = FALLBACK_IMAGE;
        currentTarget.classList.add('movie__card__fallback__poster');
        setIsFallbackPoster(true);
    }

    return (
        <div className='movie__card'>
            <div>
                <img 
                    className='movie__card__poster'
                    src={Poster}
                    alt={isFallbackPoster 
                            ? 'An error ocurred loading the poster.' 
                            : `A poster of ${Title}.`
                        }
                    loading='lazy'
                    onError={handleImageOnError}
                />
            </div>

            <div>
                {isBookmarked && 
                    <ActionButton id={imdbID} isBookmarked={true} />
                }

                <div 
                    className={
                        `movie__card__body ${
                            isFallbackPoster 
                            ? 'movie__card__body--static' 
                            : ''
                        }`
                    }
                >
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