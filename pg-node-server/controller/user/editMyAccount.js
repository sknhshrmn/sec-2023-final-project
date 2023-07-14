import query from "../../config/dbConfig.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

/* The function generates an access token using user data and a secret key. */
const generateAccessToken = (userData) => {
  // console.log(userData);
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const editMyAccount = async (req, res) => {
  /* Extracting the `id` property from the `req.user` object */
  const user_id = req.user.id;
  /* Assigning the value of `req.user` to the variable `user`. */
  const user = req.user;

  /* Creating an object called `updatedInfo` that contains the updated values for the
  username, email, and fullname properties, extracted from the `req.body` object */
  const updatedInfo = {
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  };

  /* Executing an SQL query to update the `users` table in
 the database. */
  const dbRes = await query(
    "UPDATE users SET username=$1, email=$2, fullname=$3 WHERE id=$4",
    [
      updatedInfo["username"],
      updatedInfo["email"],
      updatedInfo["fullname"],
      user_id,
    ]
  )
    .then(() => {
      /* Updating the username, email, and fullname in variable `user` */
      user.username = updatedInfo["username"];
      user.email = updatedInfo["email"];
      user.fullname = updatedInfo["fullname"];

      /* Assigning the value of `user` to the variable `req.user`. */
      req.user = user;

      /* Regenerate a new access token */
      const token = generateAccessToken({
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        is_admin: user.is_admin,
      });

      /* Success message */
      const serverRes = {
        message: "Account updated successfully",
        userData: user,
        access_token: token,
      };
      res.status(200).json(serverRes);
    })
    .catch((error) => {
      /* Error handling */
      // console.log(error.message);
      if (
        error.message ===
        'duplicate key value violates unique constraint "users_username_key"'
      ) {
        const serverRes = {
          message: "Username already exists.",
        };
        res.status(403).json({ serverRes });
      }
      if (
        error.message ===
        'duplicate key value violates unique constraint "users_email_key"'
      ) {
        const serverRes = {
          message: "Email already exists.",
        };
        res.status(403).json({ serverRes });
      } else {
        const serverRes = {
          message: "Error editing your account",
          error: error.message,
        };
        res.status(403).json(serverRes);
      }
    });
};

export default editMyAccount;
