import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCartItemSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, featured } = req.query;
      const products = await storage.getProducts(
        categoryId ? parseInt(categoryId as string) : undefined,
        featured === "true" ? true : featured === "false" ? false : undefined
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Users
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Cart (assuming user ID 1 for demo)
  app.get("/api/cart", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from session/auth
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from session/auth
      const cartItemData = insertCartItemSchema.parse({ ...req.body, userId });
      
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      
      if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const cartItem = await storage.updateCartItem(parseInt(req.params.id), quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from session/auth
      await storage.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from session/auth
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const userId = 1; // In a real app, this would come from session/auth
      
      // Get cart items
      const cartItems = await storage.getCartItems(userId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

      // Create order
      const orderData = insertOrderSchema.parse({
        userId,
        total: total.toString(),
        status: "pending",
        shippingAddress: req.body.shippingAddress || "Default address"
      });

      const order = await storage.createOrder(orderData);

      // Create order items
      for (const cartItem of cartItems) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          size: cartItem.size
        });
      }

      // Clear cart
      await storage.clearCart(userId);

      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
