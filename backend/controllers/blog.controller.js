// // controllers/blog.controller.js
// import Blog from "../models/blog.model.js";

// // Create a new blog post
// export const createBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const newBlog = new Blog({
//       title,
//       content,
//       author: req.user._id, // Get the logged-in user from protectRoute middleware
//     });
//     await newBlog.save();

//     res.status(201).json(newBlog);
//   } catch (error) {
//     console.error("Error creating blog:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get all blog posts
// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("author", "username profilePic");
//     res.status(200).json(blogs);
//   } catch (error) {
//     console.error("Error getting blogs:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get a blog post by ID
// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate(
//       "author",
//       "username profilePic"
//     );
//     if (!blog) return res.status(404).json({ error: "Blog post not found" });

//     res.status(200).json(blog);
//   } catch (error) {
//     console.error("Error getting blog by ID:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Update a blog post
// export const updateBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) return res.status(404).json({ error: "Blog post not found" });

//     if (blog.author.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ error: "Not authorized to update this blog post" });
//     }

//     blog.title = title || blog.title;
//     blog.content = content || blog.content;
//     blog.updatedAt = Date.now();

//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     console.error("Error updating blog:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Delete a blog post
// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) return res.status(404).json({ error: "Blog post not found" });

//     if (blog.author.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ error: "Not authorized to delete this blog post" });
//     }

//     await blog.remove();
//     res.status(200).json({ message: "Blog post deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting blog:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
