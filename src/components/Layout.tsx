import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: FC = () => {
    return (
        <div className="layout">
            <header className="nav-bar">
                <nav className="nav">
                    <Link className="nav-links" to="/">Котики</Link>
                    <Link className="nav-links" to="/fav">Избранные Котики</Link>
                </nav>
            </header>
            <main className="main">
                <Outlet />
            </main>
        </div>
    )

}
    

export default Layout;