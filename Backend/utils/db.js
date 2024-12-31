const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) {
      throw new Error("MongoDB URL is not defined");
    }

    await mongoose.connect(dbUrl); // No need for `useNewUrlParser` and `useUnifiedTopology`
    console.log("Database connection established");
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
