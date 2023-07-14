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

  // Handle button to scroll to top
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
      {/* Section 1 */}
      <div className="hero">
        <div className="overlay">
          <div
            className="container"
            style={{
              top: 120,
              backgroundColor: "transparent",
              minHeight: "calc(100vh - 120px)",
            }}
          >
            <div className="container-greeting-intro">
              {/* Greeting and introductions */}
              <div>
                <p className="text-greeting-heading">Takaful & Hibah </p>
                <p
                  className="text-greeting-heading"
                  style={{
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
                <p className="text-name-agent-line-1">FITRI</p>
                <p className="text-name-agent-line-2" style={{}}>
                  YAHAYA
                </p>
              </div>
              <div className="container-intro"></div>
              <h3 className="text-intro">
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
