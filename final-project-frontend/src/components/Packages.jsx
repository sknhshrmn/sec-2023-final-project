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
          {/* Takaful Harmoni */}
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
          {/* Takaful Prisma */}
          <div
            className="package-card"
            style={{ backgroundColor: "#f3d52e", color: "black" }}
          >
            <p style={{ fontWeight: "bold", padding: "1rem" }}>
              Takaful Prisma
            </p>
            <img src="Prisma.png" alt="package 1 photo" />
            <div style={{ padding: "1rem" }}>
              <div>
                With Prisma Takaful, you can further provide worry-free coverage
                for your family’s future security alongside your existing
                savings. All it requires is an affordable contribution of RM50
                per month to ensure your family is taken care of.
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
          {/* Hibah*/}
          <div className="package-card">
            <p style={{ fontWeight: "bold", padding: "1rem" }}>
              Mahabbah Takafulink
            </p>
            <img src="Hibah.png" alt="package 1 photo" />
            <div style={{ padding: "1rem" }}>
              <div>
                Etiqa’s Mahabbah Takafulink investment-linked takaful plan helps
                you ensure the dreams for your loved ones will continue even
                when you are no longer around with our Fast & Easy offerings.
              </div>
              <div style={{ padding: "1rem" }}>
                <p>Key benefits:</p>
                <ul>
                  <li>Hibah</li>
                  <li>Disability Care Payout</li>
                  <li>No Medical Examination</li>
                  <li>Flexibility</li>
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
