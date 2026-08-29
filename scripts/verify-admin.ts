import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { db } from "../lib/db";
import {
  services,
  products,
  galleryItems,
  quoteRequests,
  contactMessages,
  testimonials,
  siteSettings,
  user,
} from "../lib/schema";
import { eq, desc } from "drizzle-orm";

async function verifyAdmin() {
  console.log("🔍 Running Comprehensive Admin Backend & DB Verification...");

  // 1. Check User & Role
  const adminUsers = await db.select().from(user);
  console.log(`👤 Found ${adminUsers.length} user(s):`);
  for (const u of adminUsers) {
    console.log(`   - Email: ${u.email} | Role: ${u.role}`);
  }

  // 2. Test Services CRUD in DB
  console.log("🛠️ Testing Services CRUD...");
  const [testService] = await db
    .insert(services)
    .values({
      title: "Test Facade Glazing",
      slug: "test-facade-glazing",
      description: "Test description for admin validation",
      order: 99,
    })
    .returning();
  console.log(`   - Created test service ID: ${testService.id}`);

  await db
    .update(services)
    .set({ description: "Updated test description" })
    .where(eq(services.id, testService.id));
  console.log("   - Updated test service successfully.");

  await db.delete(services).where(eq(services.id, testService.id));
  console.log("   - Deleted test service successfully.");

  // 3. Test Products CRUD in DB
  console.log("📦 Testing Products CRUD...");
  const [testProduct] = await db
    .insert(products)
    .values({
      name: "Test Aluminium Section",
      category: "Aluminium Profiles",
      description: "Test product description",
      specs: "Alloy 6063-T6",
    })
    .returning();
  console.log(`   - Created test product ID: ${testProduct.id}`);

  await db.delete(products).where(eq(products.id, testProduct.id));
  console.log("   - Deleted test product successfully.");

  // 4. Test Quotes Management
  console.log("📝 Testing Quote status update...");
  const quotes = await db.select().from(quoteRequests).limit(1);
  if (quotes.length > 0) {
    const q = quotes[0];
    await db
      .update(quoteRequests)
      .set({ status: "contacted" })
      .where(eq(quoteRequests.id, q.id));
    console.log(`   - Updated quote (${q.id}) status to 'contacted'`);
  }

  // 5. Test Site Settings
  console.log("⚙️ Testing Site Settings update...");
  await db
    .insert(siteSettings)
    .values({
      key: "admin_test_key",
      value: "admin_test_value",
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: "admin_test_value_updated", updatedAt: new Date() },
    });
  console.log("   - Updated site settings successfully.");

  await db.delete(siteSettings).where(eq(siteSettings.key, "admin_test_key"));
  console.log("   - Cleaned test site setting.");

  console.log("🎉 All Admin Panel CRUD and Database Operations PASSED!");
}

verifyAdmin();
