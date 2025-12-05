import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, real } from "drizzle-orm/pg-core";
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

// Banners table for hero slider
export const banners = pgTable("banners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleTj: text("title_tj").notNull(),
  titleRu: text("title_ru"),
  titleEn: text("title_en"),
  subtitleTj: text("subtitle_tj"),
  subtitleRu: text("subtitle_ru"),
  subtitleEn: text("subtitle_en"),
  imageUrl: text("image_url"),
  imageFit: text("image_fit").default("cover"),
  imagePosition: text("image_position").default("center"),
  cropX: real("crop_x").default(0),
  cropY: real("crop_y").default(0),
  cropZoom: real("crop_zoom").default(1),
  buttonTextTj: text("button_text_tj"),
  buttonTextRu: text("button_text_ru"),
  buttonTextEn: text("button_text_en"),
  buttonLink: text("button_link"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// News table for news feed
export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleTj: text("title_tj").notNull(),
  titleRu: text("title_ru"),
  titleEn: text("title_en"),
  contentTj: text("content_tj").notNull(),
  contentRu: text("content_ru"),
  contentEn: text("content_en"),
  excerptTj: text("excerpt_tj"),
  excerptRu: text("excerpt_ru"),
  excerptEn: text("excerpt_en"),
  imageUrl: text("image_url"),
  imageFit: text("image_fit").default("cover"),
  imagePosition: text("image_position").default("center"),
  cropX: real("crop_x").default(0),
  cropY: real("crop_y").default(0),
  cropZoom: real("crop_zoom").default(1),
  isActive: boolean("is_active").notNull().default(true),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Admin users table
export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Banner schemas
export const insertBannerSchema = createInsertSchema(banners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  titleTj: z.string().min(2, "Сарлавҳа бояд аз 2 аломат бештар бошад"),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const updateBannerSchema = z.object({
  titleTj: z.string().min(2).optional(),
  titleRu: z.union([z.string().min(2), z.null()]).optional(),
  titleEn: z.union([z.string().min(2), z.null()]).optional(),
  subtitleTj: z.union([z.string(), z.null()]).optional(),
  subtitleRu: z.union([z.string(), z.null()]).optional(),
  subtitleEn: z.union([z.string(), z.null()]).optional(),
  imageUrl: z.union([z.string(), z.null()]).optional(),
  imageFit: z.enum(["cover", "contain", "fill"]).optional(),
  imagePosition: z.enum(["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"]).optional(),
  cropX: z.number().optional(),
  cropY: z.number().optional(),
  cropZoom: z.number().min(1).max(3).optional(),
  buttonTextTj: z.union([z.string(), z.null()]).optional(),
  buttonTextRu: z.union([z.string(), z.null()]).optional(),
  buttonTextEn: z.union([z.string(), z.null()]).optional(),
  buttonLink: z.union([z.string(), z.null()]).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

// News schemas
export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  titleTj: z.string().min(2, "Сарлавҳа бояд аз 2 аломат бештар бошад"),
  contentTj: z.string().min(10, "Мундариҷа бояд аз 10 аломат бештар бошад"),
  isActive: z.boolean().default(true),
  publishedAt: z.coerce.date().optional(),
});

export const updateNewsSchema = z.object({
  titleTj: z.string().min(2).optional(),
  titleRu: z.union([z.string().min(2), z.null()]).optional(),
  titleEn: z.union([z.string().min(2), z.null()]).optional(),
  contentTj: z.string().min(10).optional(),
  contentRu: z.union([z.string().min(10), z.null()]).optional(),
  contentEn: z.union([z.string().min(10), z.null()]).optional(),
  excerptTj: z.union([z.string(), z.null()]).optional(),
  excerptRu: z.union([z.string(), z.null()]).optional(),
  excerptEn: z.union([z.string(), z.null()]).optional(),
  imageUrl: z.union([z.string(), z.null()]).optional(),
  imageFit: z.enum(["cover", "contain", "fill"]).optional(),
  imagePosition: z.enum(["center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"]).optional(),
  cropX: z.number().optional(),
  cropY: z.number().optional(),
  cropZoom: z.number().min(1).max(3).optional(),
  isActive: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
});

// Admin schemas
export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
}).extend({
  username: z.string().min(3, "Номи корбар бояд аз 3 аломат бештар бошад"),
  password: z.string().min(6, "Парол бояд аз 6 аломат бештар бошад"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Номи корбар лозим аст"),
  password: z.string().min(1, "Парол лозим аст"),
});

export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = typeof banners.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
