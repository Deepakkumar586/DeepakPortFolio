const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL; // Fetch the URL from environment variable
    if (!dbUrl) {
      throw new Error("MongoDB URL is not defined in the environment variables");
    }

    // Log the connection URL for debugging
    console.log("MongoDB URL:", dbUrl);

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection established");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDb;
