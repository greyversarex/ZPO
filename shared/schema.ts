import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameTj: text("name_tj").notNull(),
  nameRu: text("name_ru"),
  nameEn: text("name_en"),
  descriptionTj: text("description_tj").notNull(),
  descriptionRu: text("description_ru"),
  descriptionEn: text("description_en"),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const branches = pgTable("branches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameTj: text("name_tj").notNull(),
  nameRu: text("name_ru"),
  nameEn: text("name_en"),
  cityTj: text("city_tj").notNull(),
  cityRu: text("city_ru"),
  cityEn: text("city_en"),
  descriptionTj: text("description_tj").notNull(),
  descriptionRu: text("description_ru"),
  descriptionEn: text("description_en"),
  addressTj: text("address_tj"),
  addressRu: text("address_ru"),
  addressEn: text("address_en"),
  phone: text("phone"),
  email: text("email"),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  mapUrl: text("map_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Почтаи электронӣ нодуруст аст"),
  name: z.string().min(2, "Ном бояд аз 2 аломат бештар бошад"),
  message: z.string().min(10, "Паём бояд аз 10 аломат бештар бошад"),
  phone: z.string().optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  nameTj: z.string().min(2, "Ном бояд аз 2 аломат бештар бошад"),
  descriptionTj: z.string().min(10, "Тавсиф бояд аз 10 аломат бештар бошад"),
  category: z.string().min(2, "Категория бояд аз 2 аломат бештар бошад"),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const updateProductSchema = z.object({
  nameTj: z.string().min(2, "Ном бояд аз 2 аломат бештар бошад").optional(),
  nameRu: z.union([z.string().min(2), z.null()]).optional(),
  nameEn: z.union([z.string().min(2), z.null()]).optional(),
  descriptionTj: z.string().min(10, "Тавсиф бояд аз 10 аломат бештар бошад").optional(),
  descriptionRu: z.union([z.string().min(10), z.null()]).optional(),
  descriptionEn: z.union([z.string().min(10), z.null()]).optional(),
  category: z.string().min(2, "Категория бояд аз 2 аломат бештар бошад").optional(),
  imageUrl: z.union([z.string().url(), z.null()]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const insertBranchSchema = createInsertSchema(branches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  nameTj: z.string().min(2, "Ном бояд аз 2 аломат бештар бошад"),
  cityTj: z.string().min(2, "Номи шаҳр бояд аз 2 аломат бештар бошад"),
  descriptionTj: z.string().min(5, "Тавсиф бояд аз 5 аломат бештар бошад"),
  latitude: z.string(),
  longitude: z.string(),
  mapUrl: z.string().url("URL-и харита нодуруст аст"),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const updateBranchSchema = z.object({
  nameTj: z.string().min(2, "Ном бояд аз 2 аломат бештар бошад").optional(),
  nameRu: z.union([z.string().min(2), z.null()]).optional(),
  nameEn: z.union([z.string().min(2), z.null()]).optional(),
  cityTj: z.string().min(2, "Номи шаҳр бояд аз 2 аломат бештар бошад").optional(),
  cityRu: z.union([z.string().min(2), z.null()]).optional(),
  cityEn: z.union([z.string().min(2), z.null()]).optional(),
  descriptionTj: z.string().min(5, "Тавсиф бояд аз 5 аломат бештар бошад").optional(),
  descriptionRu: z.union([z.string().min(5), z.null()]).optional(),
  descriptionEn: z.union([z.string().min(5), z.null()]).optional(),
  addressTj: z.union([z.string().min(5), z.null()]).optional(),
  addressRu: z.union([z.string().min(5), z.null()]).optional(),
  addressEn: z.union([z.string().min(5), z.null()]).optional(),
  phone: z.union([z.string().min(5), z.null()]).optional(),
  email: z.union([z.string().email(), z.null()]).optional(),
  latitude: z.string().min(1).optional(),
  longitude: z.string().min(1).optional(),
  mapUrl: z.string().url("URL-и харита нодуруст аст").optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertBranch = z.infer<typeof insertBranchSchema>;
export type Branch = typeof branches.$inferSelect;
