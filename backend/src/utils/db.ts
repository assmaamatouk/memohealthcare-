import mysql from "mysql2/promise";

let pool: mysql.Pool;

export const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "memohealthcare",
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
};