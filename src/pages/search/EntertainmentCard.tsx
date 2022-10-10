import { EntertainmentPresentation } from "../../proxies";
import { ReactComponent as Heart } from "../../assets/icons/icon-heart-white.svg";

type EntertainmentCardProps = EntertainmentPresentation & {
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
                <img 
                    className='movie__card__poster'
                    src={Poster}
                    alt={Title}
                    loading='lazy'
                />
            </div>

            <div>
                {isBookmarked &&
                    <button
                        className='movie__card__action'
                        data-bookmark-id={imdbID}
                        tabIndex={0}
                    >
                        <Heart className='filled pointer-events-none' />
                    </button>
                }

                <div 
                    className='movie__card__body'
                    data-entertainment-id={imdbID}
                    data-entertainment-type={Type}
                    tabIndex={0}
                >
                    {!isBookmarked &&
                        <button
                            className='movie__card__action'
                            data-bookmark-id={imdbID}
                            tabIndex={0}
                        >
                            <Heart className='pointer-events-none' />
                        </button>
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