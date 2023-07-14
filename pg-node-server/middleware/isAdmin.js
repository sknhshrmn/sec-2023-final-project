const isAdmin = (req, res, next) => {
  /* Checking if the `is_admin` property of the `req.user` object is truthy. 
  Proceed is true */
  if (req.user.is_admin) {
    next();
  } else {
    /* Error message */
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAdmin;
