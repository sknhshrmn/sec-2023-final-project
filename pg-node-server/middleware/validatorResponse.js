import { validationResult } from "express-validator";

const validatorResponse = (req, res, next) => {
  /* Return validation error */
  const validationError = validationResult(req).array();

  /* Error message if there is validation error */
  if (validationError.length > 0) {
    const serverRes = {
      message: "Invalid request",
      error: validationError,
    };
    res.status(403).json(serverRes);
    return;
  } else {
    /* If no validation error
    Pass control to the next middleware function in the request-response cycle. */
    next();
  }
};

export default validatorResponse;
