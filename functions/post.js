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
  const query = `
    SELECT posts.id, posts.title, posts.content, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  try {
    const [rows] = await conn.execute(query);
    return rows;
  } catch (error) {
    console.error("Error fetching posts:", error.message, error.stack);
    throw error;
  }
}
