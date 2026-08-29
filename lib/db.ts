import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:placeholder@localhost:5432/neondb";

// Neon HTTP driver client for serverless environments (avoids connection pooling issues)
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
