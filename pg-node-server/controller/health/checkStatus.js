/**
 * The function checkStatus sends a response with a status code of 200 and a JSON object containing the
 * status "ok".
 */
const checkStatus = (req, res) => {
  res.status(200).json({ status: "ok" });
};

export default checkStatus;
