import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server run on port 8080");
});
