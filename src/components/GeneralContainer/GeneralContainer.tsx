import './GeneralContainer.css';

interface GeneralContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

export const GeneralContainer = ({ children }: GeneralContainerProps) => {
    return (
        <div className="general__container">
            {children}
        </div>
    );
}