const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./utils/db");
const userRouter = require("./route/user.js");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://deepakportfolio-n7vt.onrender.com", // Ensure this is correct
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// User API
app.use("/api/user", userRouter);

// Serve static files from the 'Frontend/build' directory
app.use(express.static(path.resolve(__dirname, "..", "Frontend", "build")));

// Catch-all route to serve the index.html for the single-page application (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "Frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
