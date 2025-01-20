import { conn } from "../config/database";

export async function savePost(title, content, userId) {
  const query = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
  const values = [title, content, userId];

  try {
    const [result] = await conn.execute(query, values);
    return { id: result.insertId };
  } catch (error) {
    console.error("Error saving post:", error);
    console.error("Error details:", error.message, error.stack);
    return false;
  }
}
