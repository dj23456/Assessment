import React from 'react';
import {Link,NavLink} from 'react-router-dom';

function Sidebar() {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Dashboard</span>
                    </NavLink>
                </li>
              
                <li className="nav-item">
                    <NavLink className="nav-link" to="/products">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Add Products</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                        <i className="icon-grid-2 menu-icon" />
                        <span className="menu-title">Manage Products</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="tables">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <NavLink className="nav-link" to="/tables">Basic table</NavLink></li>
                            <li className="nav-item"> <NavLink className="nav-link" to="/redirect">Redirect Page</NavLink></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="icon-head menu-icon" />
                        <span className="menu-title">User Pages</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <NavLink className="nav-link" to="/index"> Login </NavLink></li>
                            <li className="nav-item"> <NavLink className="nav-link" to="/register"> Register </NavLink></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar