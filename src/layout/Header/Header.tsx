import { Outlet } from "react-router-dom";

import { ReactComponent as Logo } from '../../assets/logos/logo.svg'
import { GeneralContainer } from "../../components";

import './Header.css';

export const Header = () => {
    return (
        <>
            <header className="header">
                <GeneralContainer>
                    <Logo />
                </GeneralContainer>
            </header>
            <Outlet />
        </>
    )
}