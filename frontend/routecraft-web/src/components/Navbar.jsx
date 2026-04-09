import React from "react";
import logo from "../assets/logo-mountains.png";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
const { pathname } = useLocation();
const onHome = pathname === "/";
const onSoftware = pathname === "/software";
const onAdmin = pathname === "/admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">

        {/* LOGO + BRAND */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="RouteCraft Logo" 
            className="nav-logo"
            // style={{ height: "55px", width: "auto" }}
          />
          <span className="ms-2 brand-text">RouteCraft Technology Services</span>
        </Link>

        {/* COLLAPSE BUTTON */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE LINKS */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            

            {/* When NOT on home, show Home link */}
            {!onHome && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
            )}

            {/* Home page anchors only make sense on home */}
            {onHome && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#services">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#pricing">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
              </>
            )}
            {/* Always show Software link */}
            {!onSoftware && !onAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/software">
                  Software
                </NavLink>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}