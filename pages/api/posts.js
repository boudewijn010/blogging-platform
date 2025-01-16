import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const posts = await db.collection("posts").find({}).toArray();
    res.json(posts);
  } else if (req.method === "POST") {
    const post = req.body;
    await db.collection("posts").insertOne(post);
    res.status(201).json(post);
  }
}
