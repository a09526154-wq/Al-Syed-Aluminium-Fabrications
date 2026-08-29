import { db } from "../lib/db";
import { galleryItems } from "../lib/schema";
import { ilike } from "drizzle-orm";

async function fixGalleryImage() {
  console.log("🔍 Checking and updating High-Rise Structural Glazing & ACP Cladding image...");

  const reliableImageUrl =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop";

  const updated = await db
    .update(galleryItems)
    .set({ imageUrl: reliableImageUrl })
    .where(ilike(galleryItems.title, "%High-Rise%"))
    .returning();

  if (updated.length > 0) {
    console.log(`✅ Successfully updated ${updated.length} item(s):`, updated);
  } else {
    console.log("ℹ️ Item not found, inserting new gallery item...");
    const inserted = await db.insert(galleryItems).values({
      title: "High-Rise Structural Glazing & ACP Cladding",
      category: "commercial",
      projectType: "Commercial Plaza",
      imageUrl: reliableImageUrl,
    }).returning();
    console.log("✅ Inserted:", inserted);
  }
}

export default fixGalleryImage;
