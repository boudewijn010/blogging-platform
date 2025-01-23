import { conn } from "../config/database";

export async function savePost(title, content, userId, isDraft = false) {
  const query =
    "INSERT INTO posts (title, content, user_id, is_draft) VALUES (?, ?, ?, ?)";
  const values = [title, content, userId, isDraft];

  try {
    const [result] = await conn.execute(query, values);
    return { id: result.insertId };
  } catch (error) {
    console.error("Error saving post:", error.message, error.stack);
    return false;
  }
}

export async function getPosts() {
  const query = "SELECT * FROM posts WHERE is_draft = FALSE";
  try {
    const [rows] = await conn.execute(query);
    return rows;
  } catch (error) {
    console.error("Error fetching posts:", error.message, error.stack);
    throw error;
  }
}

export async function getPostsByUser(userId) {
  const query = "SELECT * FROM posts WHERE user_id = ? AND is_draft = FALSE";
  const values = [userId];
  try {
    const [rows] = await conn.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching posts by user:", error.message, error.stack);
    throw new Error("Database query failed");
  }
}

export async function getDraftsByUser(userId) {
  const query = "SELECT * FROM posts WHERE user_id = ? AND is_draft = TRUE";
  const values = [userId];
  try {
    const [rows] = await conn.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching drafts by user:", error.message, error.stack);
    throw new Error("Database query failed");
  }
}

export async function getPostById(id) {
  const query = "SELECT * FROM posts WHERE id = ?";
  const values = [id];
  try {
    const [rows] = await conn.execute(query, values);
    if (rows.length === 0) {
      throw new Error("Post not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching post by ID:", error.message, error.stack);
    console.error("Response status:", error.response?.status);
    console.error("Response message:", error.response?.data?.message);
    throw new Error("Database query failed");
  }
}
