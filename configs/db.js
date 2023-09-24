const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const colors = require("colors");
require('dotenv').config();

let mongoServer;

// Function to connect to the database
exports.connectToDatabase = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      // Use an in-memory database for testing
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri, { dbName: "booDB" });
      console.log(
        `Connected to test database at Port : ${colors.yellow(mongoUri)}`.blue
      );
    } else {
      // Connect to production database
      const uri = process.env.MONGO_URI;
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(
        `Connected to production database at URI : ${colors.yellow(uri)}`.blue
      );
    }
  } catch (error) {
    console.error(colors.red("Database connection error:", error));
    throw error;
  }
};

// Function to close the database connection
exports.closeDatabase = async () => {
  if (process.env.NODE_ENV === "test") {
    // For testing, stop the in-memory server and disconnect from database
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log(colors.blue("Closed test database connection"));
  } else {
    // For production, simply disconnect from the database
    await mongoose.disconnect();
    console.log(colors.blue("Closed production database connection"));
  }
};
