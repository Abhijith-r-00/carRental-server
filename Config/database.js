const mongoose = require("mongoose");

const connectionString = process.env.CONNECTIONSTRING;
mongoose
  .connect(connectionString)
  .then(() => console.log("sucessfully connect with mongoDB"))
  .catch((e) => console.log(e));
