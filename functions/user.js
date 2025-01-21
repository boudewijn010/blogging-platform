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
    console.error("Error saving user:", error.message, error.stack);
    return false;
  }
}

export async function verifyUser(username, password) {
  const query = "SELECT * FROM users WHERE username = ?";
  const values = [username];

  try {
    const [rows] = await conn.execute(query, values);
    console.log("Query executed. Found rows:", rows);

    if (rows.length > 0) {
      const user = rows[0];
      console.log("User found:", user);

      const isValid = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isValid);

      if (isValid) {
        return user;
      }
    } else {
      console.warn("No user found with the username:", username);
    }
    return false;
  } catch (error) {
    console.error("Error verifying user:", error.message, error.stack);
    return false;
  }
}
