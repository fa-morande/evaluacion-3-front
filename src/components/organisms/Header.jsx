import React from "react";
import Navbar from "../molecules/NavBar";
import "../../styles/organisms/Header.css";

const Header = ({ carrito = [] }) => {
  return (
    <header>
      <Navbar carrito={carrito} />
    </header>
  );
};


export default Header;
