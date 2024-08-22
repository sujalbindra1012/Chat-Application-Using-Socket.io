import { Router } from "express";

import User from "../models/user.js";
import {
  createTokenForUser,
  validateToken,
} from "../service/authentication.js";

const router = Router();

router.post("/", async (req, res) => {
  const { token } = req.body;
  if (token) {
    const data = validateToken(token);
    const user = await User.findById(data._id);

    if (!user) {
      return res.json({ msg: "Invalid user" });
    } else {
      return res.json({ msg: "Valid user" });
    }
  } else {
    const { name, email, password } = req.body;

    await User.create({
      fullName: name,
      email: email,
      password: password,
    });

    const user = await User.findOne({
      email: email,
    });

    console.log(user);

    const token = createTokenForUser(user);
    return res.json({ token: token });
  }
});

export default router;
