import * as React from "react";

export default function Header() {
  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{ fontFamily: "Roboto !important", fontSize: "2rem" }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            height="40"
            className="d-inline-block align-text-top"
          />
          HN Read
        </a>
      </div>
    </nav>
  );
}
