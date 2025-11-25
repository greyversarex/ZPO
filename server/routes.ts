import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertProductSchema, insertBranchSchema, updateProductSchema, updateBranchSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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
  app.get("/api/contact/submissions", async (_req, res) => {
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

  app.post("/api/products", async (req, res) => {
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

  app.patch("/api/products/:id", async (req, res) => {
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

  app.delete("/api/products/:id", async (req, res) => {
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

  app.post("/api/branches", async (req, res) => {
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

  app.patch("/api/branches/:id", async (req, res) => {
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

  app.delete("/api/branches/:id", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
