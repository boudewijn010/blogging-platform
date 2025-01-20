import { conn } from "../config/database";

export async function savePost(title, content) {
  const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
  const values = [title, content];

  try {
    const [result] = await conn.execute(query, values);
    return { id: result.insertId };
  } catch (error) {
    console.error("Error saving post:", error);
    return false;
  }
}
