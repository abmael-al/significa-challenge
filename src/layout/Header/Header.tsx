import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logos/logo.svg'

import './Header.css';

export const Header = () => {
    return (
        <>
            <header className="header">
                <Logo />
            </header>
            <Outlet />
        </>
    )
}