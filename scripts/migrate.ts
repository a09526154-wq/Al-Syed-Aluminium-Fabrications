import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is not defined in environment.");
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql);

async function runMigrations() {
  console.log("⏳ Applying Neon PostgreSQL migrations from ./drizzle ...");
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrations applied successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
