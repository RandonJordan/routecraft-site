import React from "react";
import logo from "../assets/logo-mountains.png";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">

        {/* LOGO + BRAND */}
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img 
            src={logo} 
            alt="RouteCraft Logo" 
            className="nav-logo"
            style={{ height: "55px", width: "auto" }}
          />
          <span className="ms-2 brand-text">RouteCraft Technology Services</span>
        </a>

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
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}