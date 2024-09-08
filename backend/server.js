import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import blogRouter from "./routes/blog.js";
import userRouter from "./routes/user.js";
import User from "./models/user.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import { createHmac, randomBytes } from "node:crypto";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use("/register", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.post("/validate", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });

  let msg = "Authorized Access";
  if (user) {
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash) msg = "Unauthorized Access";
  } else {
    msg = "Unauthorized Access";
  }

  return res.json({ msg: msg });
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
