import { EntertainmentPresentation } from "../../proxies";

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
        <div 
            data-entertainment-id={imdbID}
            data-entertainment-type={Type}
        >
            <div style={{ pointerEvents: 'none', }}>
                <img 
                    src={Poster}
                    alt={Title}
                    loading='lazy'
                />
            </div>

            <button
                data-bookmark-id={imdbID}
            >
                {isBookmarked
                    ? 'Added'
                    : 'Add to favorites'
                }
            </button>

            <div>
                <h3>{Title}</h3>
                <p>{Year}</p>
            </div>
        </div>
    )
}