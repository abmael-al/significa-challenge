import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../App";
import { Entertainment } from "../proxies";

export const useEventRouteNavigation = () => {
    const navigate = useNavigate();

    const handleOnNavigateToDetails = useCallback(
        ({ target }: React.UIEvent) => {
            if(!(target instanceof HTMLElement)) return;
        
            const id = target.getAttribute('data-entertainment-id');
            const type = target.getAttribute('data-entertainment-type') as Entertainment;
            
            if(!id || !type) return;
        
            navigate(navigateTo.details(id, type));
        },
        [navigate]
    );

    return { handleOnNavigateToDetails };
}
