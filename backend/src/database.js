import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  transform: postgres.toCamel,
});

export default sql;

(async () => {
  await sql`
        CREATE TABLE IF NOT EXISTS items 
        (id SERIAL PRIMARY KEY,
        title VARCHAR(45) NOT NULL,
        description VARCHAR(255),
        is_complete BOOLEAN NOT NULL DEFAULT false);
    `;
})();
