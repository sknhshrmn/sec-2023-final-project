const Packages = () => {
  return (
    <div id="products" style={{ backgroundColor: "white", width: "100%" }}>
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
        <div className="container-package-card">
          {/* package card */}
          <div className="package-card">
            <p style={{ fontWeight: "bold", padding: "1rem" }}>
              Takaful Harmoni
            </p>
            <img src="Harmoni.png" alt="package 1 photo" />
            <div style={{ padding: "1rem" }}>
              <div>
                Harmoni gives you the flexibility and peace of mind to manage
                your finances, without comprising your takaful coverage.
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
                    Participant: Aged a minimum of 19 years, with no maximum age
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="package-card"
            style={{ backgroundColor: "#f3d52e", color: "black" }}
          >
            <p style={{ fontWeight: "bold", padding: "1rem" }}>
              Takaful Harmoni
            </p>
            <img src="Prisma.png" alt="package 1 photo" />
            <div style={{ padding: "1rem" }}>
              <div>
                Harmoni gives you the flexibility and peace of mind to manage
                your finances, without comprising your takaful coverage.
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
                    Participant: Aged a minimum of 19 years, with no maximum age
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="package-card">
            <p style={{ fontWeight: "bold", padding: "1rem" }}>
              Takaful Harmoni
            </p>
            <img src="Hibah.png" alt="package 1 photo" />
            <div style={{ padding: "1rem" }}>
              <div>
                Harmoni gives you the flexibility and peace of mind to manage
                your finances, without comprising your takaful coverage.
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
                    Participant: Aged a minimum of 19 years, with no maximum age
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
