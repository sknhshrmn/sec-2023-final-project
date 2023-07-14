import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Packages from "../components/Packages";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { HashLink } from "react-router-hash-link";
import GetQuote from "../components/GetQuote";

const Home = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 300 px
    const handleScrollButtonVisibility = () => {
      window.scrollY > window.innerHeight * 0.9
        ? setShowButton(true)
        : setShowButton(false);
    };
    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  });
  return (
    <div
      style={{
        backgroundColor: "#F3D52E",
        width: "100%",
      }}
    >
      <Header />

      {/* container */}
      {/* Section 1 */}
      <div
        className="hero"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100% - 120px)",
        }}
      >
        <div className="overlay">
          <div
            className="container"
            style={{
              top: 120,
              backgroundColor: "transparent",
              minHeight: "calc(100vh - 120px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                width: "80%",
              }}
            >
              {/* Greeting and introductions */}
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "1.5rem",
                    fontWeight: "normal",
                    color: "#f3d52e",
                  }}
                >
                  Takaful & Hibah{" "}
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "1.5rem",
                    fontWeight: "normal",
                    color: "#f3d52e",
                    lineHeight: "0.5rem",
                  }}
                >
                  Certified Etiqa Agent
                </p>
              </div>
              <div
                style={{
                  color: "white",
                }}
              >
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "7rem",
                    fontWeight: "bold",
                    lineHeight: "8rem",
                    color: "#0997A0",
                  }}
                >
                  FITRI
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "4.2rem",
                    fontWeight: "bold",
                    lineHeight: "2rem",
                  }}
                >
                  YAHAYA
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#0997A0",
                  height: "8px",
                  width: "100px",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
              ></div>
              <h3
                style={{
                  fontWeight: "normal",
                  marginBottom: "2rem",
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                We share, we care - Your insurance agent, committed to
                protecting and supporting you.
              </h3>
              <HashLink className="button-yellow" smooth to="/#quotation">
                Get a free quote
              </HashLink>
            </div>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <Packages />
      {/* Section 3 */}
      <GetQuote />
      {/* Scroll to top button */}
      {showButton && (
        <MdOutlineKeyboardArrowUp
          className="scrollToTop"
          onClick={handleScrollToTop}
          title="Scroll to Top"
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
