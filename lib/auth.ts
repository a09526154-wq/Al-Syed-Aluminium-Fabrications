import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      defaultRole: "staff",
      adminRole: "admin",
    }),
  ],
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "al_syed_secret_auth_key_2026_islamabad_pakistan_secure_token",
});

export type Session = typeof auth.$Infer.Session;
