import Footer from "../components/Footer";
import Header from "../components/Header";

const Products = (req, res, next) => {
  return (
    <div style={{ width: "100vw" }}>
      <Header />
      <div style={{ minHeight: "calc(100vh - 120px - 50px)", padding: "5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            id={"products"}
            style={{ backgroundColor: "white", width: "100%" }}
          >
            <div
              className="container"
              style={{
                width: "100%",
                backgroundColor: "white",
                paddingBottom: "3rem",
              }}
            >
              <div
                style={{ marginTop: "3rem", marginBottom: "3rem" }}
                className="title"
              >
                Insurance Products from Etiqa
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "50px",
                }}
              >
                {/* package card */}
                <div
                  style={{
                    width: "33.33%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "1px",
                    backgroundColor: "#0997A0",
                    borderRadius: "10px",
                    color: "white",
                    padding: "0.5rem",
                  }}
                >
                  <p style={{ fontWeight: "bold", padding: "1rem" }}>
                    Takaful Harmoni
                  </p>
                  <img src="Harmoni.png" alt="package 1 photo" />
                  <div style={{ padding: "1rem" }}>
                    <div>
                      Harmoni gives you the flexibility and peace of mind to
                      manage your finances, without comprising your takaful
                      coverage.
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Key benefits:</p>
                      <ul>
                        <li>Partial Withdrawal Features</li>
                        <li>Takaful Coverage</li>
                        <li>Maturity Benefit</li>
                        <li>Enhance Your Coverage</li>
                      </ul>
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Eligibility:</p>
                      <ul>
                        <li>Person Covered: Aged 14 days to 60 years</li>
                        <li>
                          Participant: Aged a minimum of 19 years, with no
                          maximum age
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "33.33%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "1px",
                    backgroundColor: "#F3D52E",
                    borderRadius: "10px",
                    color: "black",
                    padding: "0.5rem",
                  }}
                >
                  <p style={{ fontWeight: "bold", padding: "1rem" }}>
                    Takaful Harmoni
                  </p>
                  <img src="Prisma.png" alt="package 1 photo" />
                  <div style={{ padding: "1rem" }}>
                    <div>
                      Harmoni gives you the flexibility and peace of mind to
                      manage your finances, without comprising your takaful
                      coverage.
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Key benefits:</p>
                      <ul>
                        <li>Partial Withdrawal Features</li>
                        <li>Takaful Coverage</li>
                        <li>Maturity Benefit</li>
                        <li>Enhance Your Coverage</li>
                      </ul>
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Eligibility:</p>
                      <ul>
                        <li>Person Covered: Aged 14 days to 60 years</li>
                        <li>
                          Participant: Aged a minimum of 19 years, with no
                          maximum age
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "33.33%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "1px",
                    backgroundColor: "#0997A0",
                    borderRadius: "10px",
                    color: "white",
                    padding: "0.5rem",
                  }}
                >
                  <p style={{ fontWeight: "bold", padding: "1rem" }}>
                    Takaful Harmoni
                  </p>
                  <img src="Hibah.png" alt="package 1 photo" />
                  <div style={{ padding: "1rem" }}>
                    <div>
                      Harmoni gives you the flexibility and peace of mind to
                      manage your finances, without comprising your takaful
                      coverage.
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Key benefits:</p>
                      <ul>
                        <li>Partial Withdrawal Features</li>
                        <li>Takaful Coverage</li>
                        <li>Maturity Benefit</li>
                        <li>Enhance Your Coverage</li>
                      </ul>
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p>Eligibility:</p>
                      <ul>
                        <li>Person Covered: Aged 14 days to 60 years</li>
                        <li>
                          Participant: Aged a minimum of 19 years, with no
                          maximum age
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Products;
