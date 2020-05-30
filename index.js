require("dotenv").config();
//Setup database connection
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", () => {
  console.error("MongoDB Connection ERROR");
});

mongoose.connection.once("open", function () {
  console.log("MongoDB connected");
});

//Bring in the models!
require("./models/User");
require("./models/Quiz");
require("./models/Question");
require("./models/Submission");

//Start the server
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server Listening on: " + process.env.PORT);
});
