import { useSearchEntertainmentsByTitle } from "../../hooks/useSearchEntertainmentsByTitle"
import { EntertainmentType } from "../../proxies/config"

interface SearchResultScreenProps {
    query: string;
    type: EntertainmentType;
}

export const SearchResultScreen = (props: SearchResultScreenProps) => {
    const {
        entertainments,
        isNotFound,
        isError,
        isLoading,
    } = useSearchEntertainmentsByTitle(props);

    return (
        <main>
            {entertainments &&
                <div>
                    <img 
                        data-movie-id={entertainments[0].imdbID}
                        src={entertainments[0].Poster}
                    />
                    <p>Title: {entertainments[0].Title}</p>
                    <p>Type: {entertainments[0].Type}</p>
                    <p>Year: {entertainments[0].Year}</p>
                    <p>Id: {entertainments[0].imdbID}</p>
                </div>
            }

            {isLoading &&
                <h1>Loading...</h1>
            }

            {isNotFound &&
                <h1>Nothing found...</h1>
            }

            {isError &&
                <h1>Some error ocurred...</h1>
            }   
        </main>
    )
}