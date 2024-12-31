const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({});
const connectDb = require("./utils/db");
const userRouter = require("./route/user.js");
const cors = require('cors');
const path = require("path");





app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );


// path
const _dirname = path.resolve();

app.use(express.json());
// all user api
app.use("/api/user", userRouter);


// Serve static files
app.use(express.static(path.join(__dirname, "..", "Frontend", "build")));

// Catch-all route to serve the index.html for single-page application (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "Frontend", "build", "index.html"));
});
console.log(path.join(__dirname, "..", "Frontend", "dist"));


const PORT = process.env.PORT || 2727;
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on ${PORT}`);
})