import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import useSessionStorage from "../hook/useSessionStorage";
import { HashLink } from "react-router-hash-link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Header = () => {
  const [jwt, setJwt] = useSessionStorage("access_token", "");
  const [user, setUser] = useSessionStorage("userData", null);
  // const [isAdmin, setIsAdmin] = useState(user?.is_admin);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle navigation of logout button
  const navigate = useNavigate();
  const handleLogoutOut = () => {
    setJwt("");
    setUser(null);
    navigate("/");
    // location.reload();
  };

  // Responsive navbar
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "#F3D52E",
      }}
    >
      <div className="container-header">
        <Logo />
        {(toggleMenu || screenWidth > 1350) && (
          <ul>
            {/* Dashboard button */}
            {jwt ? (
              <li>
                <button
                  className="header-menu"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              </li>
            ) : null}
            {/* Products button */}
            <li>
              <HashLink className="header-menu" smooth to="/#products">
                Products
              </HashLink>
            </li>
            {/* Contact Me button */}
            <li>
              <Link className="header-menu" to="https://wa.me/+601139308813">
                Contact Me
                <img
                  alt="Chat on WhatsApp"
                  src="/whatsapp-logo-png-2280.png"
                  style={{
                    width: "2rem",
                    marginLeft: "1rem",
                  }}
                />
              </Link>
            </li>
            {/* Logout/Login button */}
            {jwt ? (
              <li>
                <button
                  className="button-white"
                  onClick={() => handleLogoutOut()}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="button-white"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            )}
            <li>
              <HashLink className="button-green" smooth to="/#quotation">
                Get a quote
              </HashLink>
            </li>
          </ul>
        )}
        {/* Hamburger/close button */}
        <button onClick={toggleNav} className="button-hamburger-close ">
          {toggleMenu || screenWidth > 1350 ? (
            <AiOutlineCloseSquare size={32} />
          ) : (
            <GiHamburgerMenu size={32} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
