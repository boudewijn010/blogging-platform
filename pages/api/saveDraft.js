import { getSession } from "next-auth/react";
import { query } from "../../utils/db";

const saveDraft = async (req, res) => {
  const session = await getSession({ req });
  console.log("Session:", session); // Log the session

  if (!session) {
    console.log("Unauthorized access attempt"); // Log unauthorized access
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    const userId = session.user.id; // Use user ID from session
    console.log("Request body:", req.body); // Log the request body

    if (!title || !content || !userId) {
      console.log("Missing required fields"); // Log missing fields
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const result = await query(
        "INSERT INTO drafts (title, content, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
        [title, content, userId]
      );
      console.log("Draft saved successfully:", result); // Log successful save

      return res.status(201).json({
        message: "Draft saved successfully",
        draftId: result.insertId,
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
};

export default saveDraft;
