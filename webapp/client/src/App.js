import React from "react";

import Routes from "./routes";
import logo from "./assets/logo.svg";

import "./App.css";

export default function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo Airinc" className="logo" />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}
