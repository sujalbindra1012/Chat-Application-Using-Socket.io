import { Router } from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";
import { ObjectId } from "mongodb";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./backend/public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

router.get("/:imgname", (req, res) => {
  const imageName = req.params.imgname;
  const imagePath = path.join(
    path.resolve(),
    "backend",
    "public",
    "images",
    imageName
  );

  console.log(imagePath);

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(err.status).end();
    } else {
      console.log("Sent:", imageName);
    }
  });
});

router.post(
  "/",
  protectRoute,
  upload.single("coverImage"),
  async (req, res) => {
    const { title, body } = req.body;
    //change this to the one who is logged in
    const user_id = req.user._id;
    await Blog.create({
      body,
      title,
      createdBy: user_id,
      coverImageURL: `/${req.file.filename}`,
    });
    return res.json({ msg: "Success" });
  }
);

router.post("/comment", async (req, res) => {});

export default router;
