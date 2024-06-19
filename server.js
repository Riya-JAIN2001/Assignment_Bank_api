const express = require("express");
// const bodyParser = require("bodyParser");
const cors = require("cors");
const bankRoutes = require("./routes/bank");
const dotenv =require('dotenv')
const app = express();
const dbConnect= require("./models/connection")
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors());


app.use("/api/banks", bankRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  dbConnect()
  console.log(`Server is running on port ${PORT}`);
});
