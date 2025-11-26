import { 
  type User, type InsertUser, 
  type ContactSubmission, type InsertContactSubmission, 
  type Product, type InsertProduct, 
  type Branch, type InsertBranch,
  type Banner, type InsertBanner,
  type News, type InsertNews,
  type Admin, type InsertAdmin,
  users, contactSubmissions, products, branches, banners, news, admins
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  getAllProducts(includeInactive?: boolean): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  
  getAllBranches(includeInactive?: boolean): Promise<Branch[]>;
  getBranch(id: string): Promise<Branch | undefined>;
  createBranch(branch: InsertBranch): Promise<Branch>;
  updateBranch(id: string, branch: Partial<InsertBranch>): Promise<Branch | undefined>;
  deleteBranch(id: string): Promise<void>;
  
  // Banners
  getAllBanners(includeInactive?: boolean): Promise<Banner[]>;
  getBanner(id: string): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: string, banner: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: string): Promise<void>;
  
  // News
  getAllNews(includeInactive?: boolean): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: string): Promise<void>;
  
  // Admins
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async getAllProducts(includeInactive = false): Promise<Product[]> {
    if (includeInactive) {
      return await db.select().from(products).orderBy(asc(products.sortOrder));
    }
    return await db.select().from(products).where(eq(products.isActive, true)).orderBy(asc(products.sortOrder));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getAllBranches(includeInactive = false): Promise<Branch[]> {
    if (includeInactive) {
      return await db.select().from(branches).orderBy(asc(branches.sortOrder));
    }
    return await db.select().from(branches).where(eq(branches.isActive, true)).orderBy(asc(branches.sortOrder));
  }

  async getBranch(id: string): Promise<Branch | undefined> {
    const result = await db.select().from(branches).where(eq(branches.id, id)).limit(1);
    return result[0];
  }

  async createBranch(branch: InsertBranch): Promise<Branch> {
    const result = await db.insert(branches).values(branch).returning();
    return result[0];
  }

  async updateBranch(id: string, branch: Partial<InsertBranch>): Promise<Branch | undefined> {
    const result = await db.update(branches)
      .set({ ...branch, updatedAt: new Date() })
      .where(eq(branches.id, id))
      .returning();
    return result[0];
  }

  async deleteBranch(id: string): Promise<void> {
    await db.delete(branches).where(eq(branches.id, id));
  }

  // Banners
  async getAllBanners(includeInactive = false): Promise<Banner[]> {
    if (includeInactive) {
      return await db.select().from(banners).orderBy(asc(banners.sortOrder));
    }
    return await db.select().from(banners).where(eq(banners.isActive, true)).orderBy(asc(banners.sortOrder));
  }

  async getBanner(id: string): Promise<Banner | undefined> {
    const result = await db.select().from(banners).where(eq(banners.id, id)).limit(1);
    return result[0];
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const result = await db.insert(banners).values(banner).returning();
    return result[0];
  }

  async updateBanner(id: string, banner: Partial<InsertBanner>): Promise<Banner | undefined> {
    const result = await db.update(banners)
      .set({ ...banner, updatedAt: new Date() })
      .where(eq(banners.id, id))
      .returning();
    return result[0];
  }

  async deleteBanner(id: string): Promise<void> {
    await db.delete(banners).where(eq(banners.id, id));
  }

  // News
  async getAllNews(includeInactive = false): Promise<News[]> {
    if (includeInactive) {
      return await db.select().from(news).orderBy(desc(news.publishedAt));
    }
    return await db.select().from(news).where(eq(news.isActive, true)).orderBy(desc(news.publishedAt));
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return result[0];
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const result = await db.insert(news).values(newsItem).returning();
    return result[0];
  }

  async updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News | undefined> {
    const result = await db.update(news)
      .set({ ...newsItem, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
    return result[0];
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // Admins
  async getAdmin(id: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
    return result[0];
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.username, username)).limit(1);
    return result[0];
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const result = await db.insert(admins).values(admin).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
