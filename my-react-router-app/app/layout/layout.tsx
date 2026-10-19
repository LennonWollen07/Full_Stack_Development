import {Outlet} from "react-router";

export default function Layout() {
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

// creates the navbar layout to be used on all pages
function Navbar() {
    return (
        <header>
            <a className="header" href="/">
                <img className="header__img" src="http://localhost:3000/pokeball.png"/>
            </a>
            <a className="header__link" href="/">Home</a>
            <a className="header__link" href="/stats_game">Stats Game</a>
        </header>
    )
}

