import { getPostsByUser } from "../../functions/post";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const posts = await getPostsByUser(userId);
      res.status(200).json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error.message, error.stack);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
