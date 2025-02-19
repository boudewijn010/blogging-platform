import { saveUser } from "../../functions/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.error("Validation error: All fields are required");
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      console.log("Registering user:", { username, email, password });
      const result = await saveUser(username, email, password);
      if (result) {
        res.status(200).json({ message: "User registered successfully" });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    } catch (error) {
      console.error("Error in handler:", error.message, error.stack);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
