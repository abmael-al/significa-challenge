import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ProgressiveLazyPosterProps {
    alt: string;
    src: string;
}

export const ProgressiveLazyPoster = (
    { alt, src, }: ProgressiveLazyPosterProps 
) => {
    const FALLBACK_SRC = '/illustrations/illustration-empty-state.png';
    const PLACEHOLDER_SRC = '/placeholders/movie-card-poster-placeholder.png';
    
    const [currentSrc, setCurrentSrc] = useState(PLACEHOLDER_SRC);
    const { inView, ref } = useInView({ threshold: 0, triggerOnce: true });

    const WHEN_FALLBACK = currentSrc === FALLBACK_SRC ? 'poster--fallback' : '';
    const WHEN_LOADED = currentSrc === PLACEHOLDER_SRC ? '' : 'poster--loaded';

    const setImage = () => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setCurrentSrc(src);
        }

        img.onerror = () => {
            setCurrentSrc(FALLBACK_SRC);
        }
    }

    useEffect(() => {
        if(!inView) return;

        setImage();

    }, [inView, src]);
    
    return (
        <img
            ref={ref}
            className={
                `movie__card__poster ${WHEN_FALLBACK} ${WHEN_LOADED}` 
            }
            src={currentSrc}
            alt={alt}
        />
    )
}