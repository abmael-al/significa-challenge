import { ThreeDots } from "react-loader-spinner";

interface LoadingAnimationProps {
    wrapperClass?: string;
}

export const LoadingAnimation = ({ wrapperClass }: LoadingAnimationProps) => {
    return (
        <div
            className={wrapperClass}
        >
            <ThreeDots
                width={75}
                height={75}
                color='#2EC4B6'
            />
        </div>
    )
}