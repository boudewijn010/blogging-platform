import { verifyUser } from "../../functions/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const result = await verifyUser(username, password);
      if (result) {
        res.status(200).json({ message: "Login successful", user: result });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in handler:", error.message, error.stack);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
