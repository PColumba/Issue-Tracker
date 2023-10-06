import postgres from "postgres";

const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 5432;
const username = process.env.USER_NAME || "user";
const password = process.env.USER_PASSWORD || "user";
const db = process.env.DB_NAME || "issues";

const sql = postgres({
  host: host,
  port: port,
  username: username,
  password: password,
  db: db,
});

export default sql;
