import { EntertainmentShortMap } from "../../proxies";

import { Link } from "react-router-dom";
import { ReactComponent as IconHeart } from "../../assets/icons/icon-heart.svg";
import { ProgressiveLazyPoster } from "../../components";

import { navigateTo } from "../../App";

interface BookmarkToggleProps {
    id: string;
    isBookmarked: boolean;
}

const BookmarkToggle = ({ id, isBookmarked }: BookmarkToggleProps) => {
    return (
        <button
            className='movie__card__toggler'
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

interface EntertainmentCardProps extends EntertainmentShortMap {
    isBookmarked: boolean;
};

export const EntertainmentCard = ({
    Poster,
    Title,
    Type,
    Year,
    imdbID,
    isBookmarked,
}: EntertainmentCardProps) => {
    return (
        <div className='movie__card'>
            <div>
                <ProgressiveLazyPoster 
                    src={Poster}
                    fallbackSrc='/images/poster-fallback.png'
                    placeholderSrc='/images/poster-placeholder-small.png'
                    imgClass='movie__card__poster'
                    whenImgLoadClass='mc__poster--loaded'
                    whenImgFallbackClass='mc__poster--fallback'
                    alt={Title}
                />
            </div>

            <div>
                {isBookmarked && 
                    <BookmarkToggle id={imdbID} isBookmarked={true} />
                }

                <div className='movie__card__body'>
                    <Link 
                        to={navigateTo.details(imdbID, Type)} 
                        className='movie__card__link' 
                    />

                    {!isBookmarked && 
                        <BookmarkToggle id={imdbID} isBookmarked={false} />
                    }

                    <div className='movie__card__text__content pointer-events-none'>
                        <h3 className='movie__card__title'>{Title}</h3>
                        <p>{Year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}