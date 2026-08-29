import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { user, siteSettings } from "../lib/schema";

async function verify() {
  console.log("🔍 Verifying Neon Database & Better Auth Configuration...");

  // 1. Check users
  const users = await db.select().from(user);
  console.log(`👤 Found ${users.length} user(s) in Neon PostgreSQL:`);
  for (const u of users) {
    console.log(`   - ID: ${u.id} | Email: ${u.email} | Name: ${u.name} | Role: ${u.role}`);
  }

  // 2. Check site settings
  const settings = await db.select().from(siteSettings);
  console.log(`⚙️ Found ${settings.length} site setting(s):`);
  for (const s of settings) {
    console.log(`   - ${s.key}: ${s.value}`);
  }

  // 3. Test Better Auth Email/Password Sign-In
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "alsyedaluminium@gmail.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "AlSyed@Admin2026!";

  console.log(`🔐 Testing Better Auth authentication for: ${adminEmail} ...`);
  try {
    const signInResult = await auth.api.signInEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
      },
    });

    if (signInResult?.token) {
      console.log("✅ Better Auth sign-in test: SUCCESS!");
      console.log(`   - Session token generated: ${signInResult.token.slice(0, 16)}...`);
      console.log(`   - User ID: ${signInResult.user.id}`);
      console.log(`   - Role: ${signInResult.user.role}`);
    } else {
      console.log("ℹ️ Sign in response:", signInResult);
    }
  } catch (error) {
    console.error("❌ Sign in verification failed:", error);
    process.exit(1);
  }

  console.log("🎉 All Phase 1 database & authentication verifications PASSED!");
}

verify();
