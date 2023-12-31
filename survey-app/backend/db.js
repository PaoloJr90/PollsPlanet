import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

pool
  .connect()
  .then(() => {
    console.log(`Database has been connected.....`);
  })
  .catch((err) => {
    console.error("Failed to establish connection with the database:", err);
    process.exit(1); // Exit the process with 'failure' status code
  });

export default pool;
