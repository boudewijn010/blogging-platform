import { savePost } from "../../functions/post";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, userId } = req.body;
    try {
      const result = await savePost(title, content, userId);
      if (result) {
        res.status(200).json({
          message: "Post created successfully",
          viewPostButton: `<button onclick="window.location.href='/posts/${result.id}'">View Post</button>`,
        });
      } else {
        res.status(500).json({ message: "Failed to create post" });
      }
    } catch (error) {
      console.error("Error in handler:", error);
      console.error("Error details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
