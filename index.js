require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const profileRouter = require("./routes/profile")

server.use(morgan("tiny"));
server.use("/profile", profileRouter.router)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
