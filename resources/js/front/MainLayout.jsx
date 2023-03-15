import { Outlet } from "react-router-dom";

export default function MainLayout() {

    return (
        <div className="main-layout">

            <nav className="top-menu">
                TOP MENU
            </nav>


            <Outlet />

        </div>
    )

}