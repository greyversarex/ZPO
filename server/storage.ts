import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Product, type InsertProduct, type Branch, type InsertBranch, users, contactSubmissions, products, branches } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

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
}

export const storage = new DbStorage();
