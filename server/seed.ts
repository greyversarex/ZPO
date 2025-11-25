import { db } from "./db";
import { products, branches } from "@shared/schema";
import { siteContent } from "../client/src/data/content";

async function seed() {
  console.log("Starting database seed...");

  try {
    // Seed products
    console.log("Seeding products...");
    const productsToInsert = siteContent.products.services.map((product, index) => ({
      nameTj: product.title,
      nameRu: null,
      nameEn: null,
      descriptionTj: product.description,
      descriptionRu: null,
      descriptionEn: null,
      category: "services",
      imageUrl: null,
      sortOrder: index,
      isActive: true,
    }));

    await db.insert(products).values(productsToInsert);
    console.log(`Inserted ${productsToInsert.length} products`);

    // Seed branches
    console.log("Seeding branches...");
    const branchesToInsert = siteContent.about.branches.map((branch, index) => {
      const coords = branch.mapUrl.match(/q=([\d.]+),([\d.]+)/);
      const latitude = coords ? coords[1] : "0";
      const longitude = coords ? coords[2] : "0";

      return {
        nameTj: branch.name,
        nameRu: null,
        nameEn: null,
        cityTj: branch.city,
        cityRu: null,
        cityEn: null,
        descriptionTj: branch.description,
        descriptionRu: null,
        descriptionEn: null,
        addressTj: null,
        addressRu: null,
        addressEn: null,
        phone: null,
        email: null,
        latitude,
        longitude,
        mapUrl: branch.mapUrl,
        sortOrder: index,
        isActive: true,
      };
    });

    await db.insert(branches).values(branchesToInsert);
    console.log(`Inserted ${branchesToInsert.length} branches`);

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
