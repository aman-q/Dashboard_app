import React from 'react';
import { MdDashboardCustomize } from "react-icons/md";

const Navbar = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#74EBD5", backgroundImage: "linear-gradient(297deg, #74EBD5 0%, #cdd1df 100%)" }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <p className="navbar-brand font-weight-bold"><MdDashboardCustomize size={30}/> Dashboard Application</p>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
