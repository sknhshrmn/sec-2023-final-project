import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => navigate("/");
  return (
    <h1
      onClick={handleNavigateHome}
      className="container-logo"
      title="Homepage"
    >
      <Link className="logo" styleto="/">
        <img
          alt="Logo"
          src="/logo.png"
          style={{ height: "70px", paddingRight: "10px" }}
        />
      </Link>
    </h1>
  );
};

export default Logo;
