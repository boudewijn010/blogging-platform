import { conn } from "../config/database";
import bcrypt from "bcrypt";

export async function saveUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  const values = [username, hashedPassword];

  try {
    const [result] = await conn.execute(query, values);
    return { id: result.insertId };
  } catch (error) {
    console.error("Error saving user:", error);
    return false;
  }
}

export async function verifyUser(username, password) {
  const query = "SELECT * FROM users WHERE username = ?";
  const values = [username];

  try {
    const [rows] = await conn.execute(query, values);
    if (rows.length > 0) {
      const user = rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return false;
  } catch (error) {
    console.error("Error verifying user:", error);
    return false;
  }
}
