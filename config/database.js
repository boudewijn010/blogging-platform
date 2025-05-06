import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database opened successfully");
  }
});
console.log("Database connection established");

export const conn = db;
