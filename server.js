const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();

connectDB();
app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
