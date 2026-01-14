import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, insertProductSchema, insertBranchSchema, 
  updateProductSchema, updateBranchSchema,
  insertBannerSchema, updateBannerSchema,
  insertNewsSchema, updateNewsSchema,
  loginSchema, insertAdminSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

// Configure multer for file uploads - use memory storage for Object Storage upload
const uploadDir = path.join(process.cwd(), "data", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use memory storage for Object Storage uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }
});

// Simple session store for admin auth (in-memory for development)
const adminSessions = new Map<string, { adminId: string; expiresAt: Date }>();

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Middleware to check admin authentication
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Авторизация лозим аст" });
  }
  
  const token = authHeader.substring(7);
  const session = adminSessions.get(token);
  
  if (!session || session.expiresAt < new Date()) {
    adminSessions.delete(token);
    return res.status(401).json({ success: false, message: "Сессия тамом шуд" });
  }
  
  (req as any).adminId = session.adminId;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  const objectStorageService = new ObjectStorageService();

  // Serve files from Object Storage (new persistent storage)
  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectFile = await objectStorageService.getObjectFile(req.params.objectPath);
      await objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        return res.status(404).json({ success: false, message: "File not found" });
      }
      console.error("Error serving object:", error);
      res.status(500).json({ success: false, message: "Error serving file" });
    }
  });

  // Serve uploaded files from local data directory (fallback for old uploads)
  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.sendFile(filePath);
    } else {
      res.status(404).json({ success: false, message: "File not found" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.json({ 
        success: true, 
        message: "Паёми шумо қабул шуд",
        submissionId: submission.id 
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating contact submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод. Лутфан баъдтар кӯшиш кунед." 
      });
    }
  });

  // Get all contact submissions (for admin)
  app.get("/api/contact/submissions", requireAdmin, async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // Delete contact submission
  app.delete("/api/contact/submissions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteContactSubmission(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const allProducts = await storage.getAllProducts(includeInactive);
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Маҳсулот ёфт нашуд" 
        });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.post("/api/products", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json({ success: true, product });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.patch("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = updateProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Маҳсулот ёфт нашуд" 
        });
      }
      res.json({ success: true, product });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error updating product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // Branches API
  app.get("/api/branches", async (req, res) => {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const allBranches = await storage.getAllBranches(includeInactive);
      res.json(allBranches);
    } catch (error) {
      console.error("Error fetching branches:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.get("/api/branches/:id", async (req, res) => {
    try {
      const branch = await storage.getBranch(req.params.id);
      if (!branch) {
        return res.status(404).json({ 
          success: false, 
          message: "Филиал ёфт нашуд" 
        });
      }
      res.json(branch);
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.post("/api/branches", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBranchSchema.parse(req.body);
      const branch = await storage.createBranch(validatedData);
      res.json({ success: true, branch });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating branch:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.patch("/api/branches/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = updateBranchSchema.parse(req.body);
      const branch = await storage.updateBranch(req.params.id, validatedData);
      if (!branch) {
        return res.status(404).json({ 
          success: false, 
          message: "Филиал ёфт нашуд" 
        });
      }
      res.json({ success: true, branch });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error updating branch:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.delete("/api/branches/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBranch(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting branch:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // ========== BANNERS API ==========
  app.get("/api/banners", async (req, res) => {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const allBanners = await storage.getAllBanners(includeInactive);
      res.json(allBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.get("/api/banners/:id", async (req, res) => {
    try {
      const banner = await storage.getBanner(req.params.id);
      if (!banner) {
        return res.status(404).json({ 
          success: false, 
          message: "Баннер ёфт нашуд" 
        });
      }
      res.json(banner);
    } catch (error) {
      console.error("Error fetching banner:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.post("/api/banners", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(validatedData);
      res.json({ success: true, banner });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating banner:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.patch("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = updateBannerSchema.parse(req.body);
      const banner = await storage.updateBanner(req.params.id, validatedData);
      if (!banner) {
        return res.status(404).json({ 
          success: false, 
          message: "Баннер ёфт нашуд" 
        });
      }
      res.json({ success: true, banner });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error updating banner:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.delete("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBanner(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting banner:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // ========== NEWS API ==========
  app.get("/api/news", async (req, res) => {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const allNews = await storage.getAllNews(includeInactive);
      res.json(allNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsItem(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ 
          success: false, 
          message: "Хабар ёфт нашуд" 
        });
      }
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.post("/api/news", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedData);
      res.json({ success: true, news: newsItem });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.patch("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      const validatedData = updateNewsSchema.parse(req.body);
      const newsItem = await storage.updateNews(req.params.id, validatedData);
      if (!newsItem) {
        return res.status(404).json({ 
          success: false, 
          message: "Хабар ёфт нашуд" 
        });
      }
      res.json({ success: true, news: newsItem });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error updating news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.delete("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteNews(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // ========== ADMIN AUTH API ==========
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const admin = await storage.getAdminByUsername(username);
      
      if (!admin) {
        return res.status(401).json({ 
          success: false, 
          message: "Номи корбар ё парол нодуруст аст" 
        });
      }
      
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          message: "Номи корбар ё парол нодуруст аст" 
        });
      }
      
      const token = generateSessionToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      adminSessions.set(token, { adminId: admin.id, expiresAt });
      
      res.json({ 
        success: true, 
        token,
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error during admin login:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  app.post("/api/admin/logout", requireAdmin, async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.substring(7);
      adminSessions.delete(token);
    }
    res.json({ success: true });
  });

  app.get("/api/admin/me", requireAdmin, async (req, res) => {
    try {
      const adminId = (req as any).adminId;
      const admin = await storage.getAdmin(adminId);
      if (!admin) {
        return res.status(404).json({ 
          success: false, 
          message: "Админ ёфт нашуд" 
        });
      }
      res.json({ 
        success: true, 
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // Create initial admin (only if no admins exist)
  app.post("/api/admin/setup", async (req, res) => {
    try {
      // Check if any admin exists
      const existingAdmin = await storage.getAdminByUsername("admin");
      if (existingAdmin) {
        return res.status(400).json({ 
          success: false, 
          message: "Админ аллакай вуҷуд дорад" 
        });
      }
      
      const { username, password } = insertAdminSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const admin = await storage.createAdmin({
        username,
        password: hashedPassword
      });
      
      res.json({ 
        success: true, 
        message: "Админ бомуваффақият сохта шуд",
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      console.error("Error creating admin:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ рух дод" 
      });
    }
  });

  // ========== FILE UPLOAD API ==========
  app.post("/api/upload", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "Файл интихоб нашудааст" 
        });
      }
      
      // Upload to Object Storage for persistent storage
      try {
        const imageUrl = await objectStorageService.uploadFile(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );
        res.json({ success: true, imageUrl });
      } catch (storageError) {
        // Fallback to local storage if Object Storage fails
        console.error("Object Storage upload failed, using local fallback:", storageError);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(req.file.originalname);
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, req.file.buffer);
        const imageUrl = `/uploads/${filename}`;
        res.json({ success: true, imageUrl });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ 
        success: false, 
        message: "Хатогӣ ҳангоми боргузорӣ" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
