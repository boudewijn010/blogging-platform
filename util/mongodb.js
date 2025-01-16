import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  if (!client.isConnected()) await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME);
  return { db, client };
}

const clientPromise = client.connect();
export default clientPromise;
