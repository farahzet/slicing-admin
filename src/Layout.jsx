import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Button } from "./components/UIReu/Buton/Button";
import { Transparent } from "./components/UIReu/Buton/Transparent";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import MenuIcon from './assets/images/MenuIcon.png'

const MemoizedSidebar = React.memo(Sidebar);
const MemoizedNavbar = React.memo(Navbar);

export const Layout = () => {
    const [menu, setMenu] = useState(false);

    return (
        <main className="h-100 d-flex flex-row">

        <div className="d-none d-md-flex">
            <MemoizedSidebar />
        </div>

        <div className="drawer-content">
            <div className="d-flex justify-content-between align-items-center mx-4 mx-md-0 shadow-sm">
            <MemoizedNavbar />
            <Button
                className={'p-0 d-flex d-md-none'}
                onClick={() => setMenu(!menu)}
            >
                <img src={MenuIcon} alt="Menu" />
            </Button>
            </div>

            {menu &&
            <div className="position-fixed d-flex d-md-none z-50 w-full h-100">
                <Transparent
                onClick={() => setMenu(false)}
                >
                <MemoizedSidebar />
                </Transparent>
            </div>
            }
            <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            closeButton={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            <Outlet />
        </div>
        </main>
    )
}