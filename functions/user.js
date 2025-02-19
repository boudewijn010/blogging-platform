import { conn } from "../config/database";
import bcrypt from "bcrypt";

export async function saveUser(username, email, password) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, hashedPassword];

  try {
    console.log("Saving user to database:", {
      username,
      email,
      hashedPassword,
    });
    const stmt = await conn.prepare(query);
    const result = await stmt.run(values);
    await stmt.finalize();
    return { id: result.lastID };
  } catch (error) {
    console.error("Error saving user:", error.message, error.stack);
    return false;
  }
}

export async function verifyUser(username, password) {
  const query = "SELECT * FROM users WHERE username = ?";
  const values = [username];

  try {
    console.log("Querying user from database:", { username });
    const stmt = await conn.prepare(query);
    const rows = await stmt.all(values);
    await stmt.finalize();
    if (rows.length > 0) {
      const user = rows[0];
      console.log("User found:", { username });
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        console.log("Password is valid for user:", { username });
        return user;
      } else {
        console.log("Invalid password for user:", { username });
      }
    } else {
      console.log("User not found:", { username });
    }
    return false;
  } catch (error) {
    console.error("Error verifying user:", error.message, error.stack);
    return false;
  }
}
