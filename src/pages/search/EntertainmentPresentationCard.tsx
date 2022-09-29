import { EntertainmentPresentation } from "../../proxies/config"

type EntertainmentPresentationCardProps = EntertainmentPresentation;

export const EntertainmentPresentationCard = ({
    Poster,
    Title,
    Year,
    Type,
    imdbID,
}: EntertainmentPresentationCardProps) => {
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
            
            {/* TODO: Implement the "add to favorites functionality". */}
            </div>
            <div>
                <h3>{Title}</h3>
                <p>{Year}</p>
            </div>
        </div>
    )
}