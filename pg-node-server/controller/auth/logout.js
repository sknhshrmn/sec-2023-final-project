import "dotenv/config";

const logout = (req, res) => {
  /* Reset the jwt to expires in shortest time possible */
  jwt.sign(
    req.user,
    process.env.JWT_SECRET,
    { expiresIn: 1 },
    (logout, err) => {
      if (logout) {
        /* Success message */
        res.status(200).json({ msg: "You have been logged out" });
      } else {
        /* Error message */
        res.status(500).json({ msg: "Error" });
      }
    }
  );
};

export default logout;
