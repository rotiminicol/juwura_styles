import { 
  users, 
  categories, 
  products, 
  cartItems, 
  orders, 
  orderItems,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(categoryId?: number, featured?: boolean): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(userId: number): Promise<void>;
  
  // Orders
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private products: Map<number, Product> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  
  private currentUserId = 1;
  private currentCategoryId = 1;
  private currentProductId = 1;
  private currentCartItemId = 1;
  private currentOrderId = 1;
  private currentOrderItemId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      { name: "Adire Bags", slug: "adire-bags", description: "Handcrafted traditional bags with authentic Adire patterns", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
      { name: "Gele", slug: "gele", description: "Premium African headwraps for special occasions", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" },
      { name: "Men's Native", slug: "mens-native", description: "Sophisticated traditional wear for the modern gentleman", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
      { name: "Women's Native", slug: "womens-native", description: "Stunning traditional dresses that celebrate African heritage", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Seed products
    const productsData = [
      {
        name: "Premium Adire Handbag",
        description: "Handwoven traditional bag with authentic Yoruba patterns. This exquisite piece combines traditional craftsmanship with modern functionality.",
        price: "45000.00",
        categoryId: 1,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "https://images.unsplash.com/photo-1594736797933-d0701ba2fe65"],
        stock: 15,
        featured: true
      },
      {
        name: "Royal Gele Headwrap",
        description: "Luxurious silk headwrap perfect for special occasions. Made from premium materials with authentic African patterns.",
        price: "25000.00",
        categoryId: 2,
        images: ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", "https://images.unsplash.com/photo-1578662996442-48f60103fc96"],
        stock: 20,
        featured: true
      },
      {
        name: "Classic Agbada Set",
        description: "Traditional three-piece Agbada with intricate embroidery. Perfect for cultural celebrations and formal events.",
        price: "85000.00",
        categoryId: 3,
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "https://images.unsplash.com/photo-1578662996442-48f60103fc96"],
        stock: 8,
        featured: true
      },
      {
        name: "Designer Ankara Dress",
        description: "Contemporary cut Ankara dress with traditional patterns. Elegant and comfortable for any occasion.",
        price: "55000.00",
        categoryId: 4,
        images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"],
        stock: 12,
        featured: true
      },
      {
        name: "Kente Clutch Bag",
        description: "Compact clutch bag with traditional kente patterns. Perfect accessory for evening events.",
        price: "35000.00",
        categoryId: 1,
        images: ["https://images.unsplash.com/photo-1594736797933-d0701ba2fe65"],
        stock: 25,
        featured: false
      },
      {
        name: "Aso Oke Gele",
        description: "Traditional Aso Oke fabric headwrap with metallic threads. A symbol of elegance and tradition.",
        price: "35000.00",
        categoryId: 2,
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96"],
        stock: 18,
        featured: false
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { 
        id: this.currentProductId++, 
        ...prod,
        createdAt: new Date()
      };
      this.products.set(product.id, product);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      id: this.currentCategoryId++,
      name: insertCategory.name,
      slug: insertCategory.slug,
      description: insertCategory.description || null,
      image: insertCategory.image || null
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Products
  async getProducts(categoryId?: number, featured?: boolean): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (categoryId) {
      products = products.filter(p => p.categoryId === categoryId);
    }
    
    if (featured !== undefined) {
      products = products.filter(p => p.featured === featured);
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      id: this.currentProductId++,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      categoryId: insertProduct.categoryId,
      images: insertProduct.images,
      stock: insertProduct.stock || 0,
      featured: insertProduct.featured || false,
      createdAt: new Date()
    };
    this.products.set(product.id, product);
    return product;
  }

  // Cart
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const userCartItems = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    return userCartItems.map(item => ({
      ...item,
      product: this.products.get(item.productId)!
    }));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values())
      .find(item => 
        item.userId === insertCartItem.userId && 
        item.productId === insertCartItem.productId &&
        item.size === insertCartItem.size
      );

    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity || 1;
      return existingItem;
    }

    const cartItem: CartItem = {
      id: this.currentCartItemId++,
      userId: insertCartItem.userId,
      productId: insertCartItem.productId,
      quantity: insertCartItem.quantity || 1,
      size: insertCartItem.size || null,
      createdAt: new Date()
    };
    this.cartItems.set(cartItem.id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<void> {
    const userCartItems = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.userId === userId);
    
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
  }

  // Orders
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      id: this.currentOrderId++,
      userId: insertOrder.userId,
      total: insertOrder.total,
      status: insertOrder.status || "pending",
      shippingAddress: insertOrder.shippingAddress,
      createdAt: new Date()
    };
    this.orders.set(order.id, order);
    return order;
  }

  async getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]> {
    const items = Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId)!
    }));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const orderItem: OrderItem = {
      id: this.currentOrderItemId++,
      orderId: insertOrderItem.orderId,
      productId: insertOrderItem.productId,
      quantity: insertOrderItem.quantity,
      price: insertOrderItem.price,
      size: insertOrderItem.size || null
    };
    this.orderItems.set(orderItem.id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();
