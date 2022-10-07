import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useRouteNavigation = () => {
    const navigate = useNavigate();

    const navigateToHome = useCallback(() => navigate('/'), [navigate]);

    return { navigateToHome };
}