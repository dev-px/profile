require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const server = express();
const profileRouter = require("./routes/profileRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Database is connected");
});

server.use(morgan("tiny"));
server.use(express.json());
server.use("/profile", profileRouter);
server.use("/auth", authRouter);
server.use("/", userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
