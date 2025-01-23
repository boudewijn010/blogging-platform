import { getPostById } from "../../functions/post";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    try {
      const post = await getPostById(id);
      res.status(200).json({ post });
    } catch (error) {
      console.error("Error fetching post:", error.message, error.stack);
      console.error("Response status: 500, message: Internal Server Error");
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    console.error("Response status: 405, message: Method not allowed");
    res.status(405).json({ message: "Method not allowed" });
  }
}
