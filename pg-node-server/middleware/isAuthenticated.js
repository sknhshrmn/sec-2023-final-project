import jwt from "jsonwebtoken";
import "dotenv/config";

const isAuthenticated = async (req, res, next) => {
  /* Extracting the access token from the request headers. */
  const authHeader = req.headers["authorization"];
  const access_token = authHeader && authHeader.split(" ")[1];

  /* Error message */
  if (access_token == null)
    return res.status(401).json({ message: "Unauthorized" });

  /* Verifying the access token using the JWT secret key. */
  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      req.user = undefined;
      return res.status(401).json({ message: "Unauthorized" });
    }
    /* Assigning the `user` object to the `user` property of the `req` object. */
    req.user = user;

    /* Pass control to the next middleware function in the request-response cycle. */
    next();
  });
};

export default isAuthenticated;
