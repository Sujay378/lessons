const mongoose = require("mongoose");

const connectDB = () =>
  mongoose.connect(
    process.env.MONGO_URI.replace("<username>", process.env.MONGO_USER).replace(
      "<password>",
      process.env.MONGO_PASS
    ),
    {
      dbName: "lessons",
    }
  );

module.exports = connectDB;
// export default connectDB
