import { saveUser } from "../../functions/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const result = await saveUser(username, password);
    if (result) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
