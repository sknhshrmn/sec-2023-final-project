import query from "../../config/dbConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

/* The function generates an access token using user data and a secret key.*/
const generateAccessToken = (userData) => {
  // console.log(userData);
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    /* Executing a database query to select a user from the "users" table based on the
    provided "identifier". The "identifier" can be either a username or an email. */
    const user = await query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [identifier]
    ).then((res) => {
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        throw res;
      }
    });

    /* Comparing the provided password with the hashed password stored in the user object. */
    bcrypt.compare(password, user.password, function (err, bcryptRes) {
      if (bcryptRes) {
        // generate access token
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          is_admin: user.is_admin,
        });

        /* Success message */
        const serverRes = {
          message: "Logged in successfully",
          userData: user,
          access_token: token,
        };
        res.status(200).json(serverRes);
      } else {
        /* Error handling */
        const serverRes = {
          message: "Login unsuccessful",
          data: "Invalid credential",
        };
        res.status(401).json(serverRes);
      }
    });
  } catch (error) {
    /* Error handling */
    const serverRes = {
      message: "Invalid request",
      error: error.message,
    };
    res.status(403).json(serverRes);
  }
};

export default login;
