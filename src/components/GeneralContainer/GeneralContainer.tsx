import './generalContainer.css';

interface GeneralContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    wrapperClass?: string;
}

export const GeneralContainer = ({ children, wrapperClass, ...rest }: GeneralContainerProps) => {
    return (
        <div 
            className={`general__container ${wrapperClass || ''}`} 
            { ...rest }
        >
            {children}
        </div>
    );
}