import { Outlet } from "react-router-dom";

export const Header = () => {
    return (
        <>
            <header>
                <a href=".">What's in</a>
            </header>
            <Outlet />
        </>
    )
}