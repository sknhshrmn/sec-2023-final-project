import query from "../../config/dbConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

/* The function generates an access token using user data and a secret key.*/
const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  var newUser = [];

  /* If no validation error, execute database query */
  try {
    const { username, email, password, fullname, is_admin } = req.body;

    /* Hashing password */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    /* Executing an SQL query to insert a new user into the "users"
    table in the database. */
    await query(
      "INSERT INTO users (username, email, password ,fullname, is_admin) VALUES ($1, $2, $3,$4, $5)",
      [username, email, hashedPassword, fullname, is_admin]
    ).then(async () => {
      newUser = await query("SELECT * FROM users WHERE username=$1", [
        username,
      ]).then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        } else {
          throw res;
        }
      });
    });

    /* Generate access token */
    const token = generateAccessToken({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      fullname: newUser.fullname,
      is_admin: newUser.is_admin,
    });

    /* Success message */
    const serverRes = {
      message: "A user created succesfully",
      userData: newUser,
      access_token: token,
    };
    res.status(200).json(serverRes);
  } catch (e) {
    /* Error handling */
    // console.log(e.message);
    if (
      e.message ===
      'duplicate key value violates unique constraint "users_username_key"'
    ) {
      const serverRes = {
        message: "Username already exists.",
      };
      res.status(403).json({ serverRes });
    } else if (
      e.message ===
      'duplicate key value violates unique constraint "users_email_key"'
    ) {
      const serverRes = {
        message: "Email already exists.",
      };
      res.status(403).json({ serverRes });
    } else {
      const serverRes = {
        message: "Invalid request",
        error: error.message,
      };
      res.status(403).json(serverRes);
    }
  }
};

export default register;
