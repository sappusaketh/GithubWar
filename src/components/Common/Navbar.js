import React from "react";

import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-md">
                    <ul className="mr-auto navbar-nav">
                        <li className=" nav-item">
                        <NavLink className="nav-link"to="/home">Home</NavLink>
                        </li>
                        <li className=" nav-item">
                        <NavLink className="nav-link" to="/battle">Battle</NavLink>
                        </li>
                        <li className=" nav-item">
                        <NavLink className="nav-link" to="/popular">Popular</NavLink>
                        </li>
                        <li className=" nav-item">
                        <NavLink className="nav-link" to="/search">Search</NavLink>
                        </li>
                    </ul>
                </nav>       
            </div>
        )
    }
}