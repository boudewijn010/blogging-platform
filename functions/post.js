import { conn } from "../config/database";

export async function savePost(title, content, userId) {
  const query = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
  const values = [title, content, userId];

  try {
    const [result] = await conn.execute(query, values);
    return { id: result.insertId };
  } catch (error) {
    console.error("Error saving post:", error.message, error.stack);
    return false;
  }
}

export async function getPosts() {
  const query = "SELECT * FROM posts";
  try {
    const [rows] = await conn.execute(query);
    return rows;
  } catch (error) {
    console.error("Error fetching posts:", error.message, error.stack);
    throw error;
  }
}

export async function getPostsByUser(userId) {
  const query = "SELECT * FROM posts WHERE user_id = ?";
  const values = [userId];
  try {
    const [rows] = await conn.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching posts by user:", error.message, error.stack);
    throw new Error("Database query failed");
  }
}
