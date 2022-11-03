import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface ProgressiveLazyPosterProps {
    src: string;
    fallbackSrc: string;
    placeholderSrc: string;
    imgClass?: string;
    whenImgLoadClass?: string;
    whenImgFallbackClass?: string;
    alt: string;
}

export const ProgressiveLazyPoster = ({ 
    src, 
    fallbackSrc, 
    placeholderSrc,
    imgClass, 
    whenImgLoadClass,
    whenImgFallbackClass,
    alt, 
}: ProgressiveLazyPosterProps ) => {
    const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
    const { inView, ref } = useInView({ threshold: 0, triggerOnce: true });

    const setImage = () => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setCurrentSrc(src);
        }

        img.onerror = () => {
            setCurrentSrc(fallbackSrc);
        }
    }

    useEffect(() => {
        if(!inView) return;

        setImage();

    }, [inView, src]);
    
    const whenImgFallback = currentSrc === fallbackSrc ? whenImgFallbackClass : '';
    const whenImgLoad = currentSrc !== placeholderSrc ? whenImgLoadClass : '';

    return (
        <img
            ref={ref}
            className={
                `${imgClass || ''} ${whenImgFallback || ''} ${whenImgLoad || ''}` 
            }
            src={currentSrc}
            alt={alt}
        />
    )
}