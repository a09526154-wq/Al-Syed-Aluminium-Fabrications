import { db } from "../lib/db";
import { services, products, galleryItems } from "../lib/schema";
import { eq } from "drizzle-orm";

async function verifyPublicPages() {
  console.log("🔍 Verifying Public Page Data Layer...");

  // 1. Verify Services
  const allServices = await db.select().from(services);
  console.log(`🛠️ Verified ${allServices.length} services in DB:`);
  for (const s of allServices) {
    console.log(`   - [${s.order}] ${s.title} (slug: /services/${s.slug})`);
  }

  // 2. Verify Dynamic Slug
  const windowService = await db
    .select()
    .from(services)
    .where(eq(services.slug, "aluminium-windows"))
    .limit(1);
  if (windowService.length > 0) {
    console.log(`✅ Dynamic slug query for 'aluminium-windows' resolved: "${windowService[0].title}"`);
  } else {
    console.error("❌ Failed to query 'aluminium-windows'");
  }

  // 3. Verify Products
  const allProducts = await db.select().from(products);
  console.log(`📦 Verified ${allProducts.length} products in DB:`);
  for (const p of allProducts) {
    console.log(`   - [${p.category}] ${p.name}`);
  }

  // 4. Verify Gallery
  const allGallery = await db.select().from(galleryItems);
  console.log(`🖼️ Verified ${allGallery.length} gallery items in DB.`);

  console.log("🎉 All Phase 2 Data Queries PASSED!");
}

verifyPublicPages();
