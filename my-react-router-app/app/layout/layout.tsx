import {Outlet} from "react-router";

export default function Layout() {
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}


function Navbar() {
    return (
        <header>
            <a className="">
                <img className="header__img" />
            </a>
            <a className="header__link" href="/">Home</a>
            <a className="header__link" href="/stats_game">Stats Game</a>
        </header>
    )
}
