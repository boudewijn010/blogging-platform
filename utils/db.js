import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

export async function query(sql, params) {
  const stmt = await db.prepare(sql);
  const result = await stmt.all(params);
  await stmt.finalize();
  return result;
}
