import { verifyUser } from "../../functions/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      console.error("Validation error: Username and password are required");
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      console.log("Verifying user:", { username });
      const user = await verifyUser(username, password);
      if (user) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error in handler:", error.message, error.stack);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
