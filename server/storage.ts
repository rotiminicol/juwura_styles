import { 
  users, 
  categories, 
  products, 
  cartItems, 
  orders, 
  orderItems,
  wishlist,
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
  type InsertOrderItem,
  type WishlistItem,
  type InsertWishlistItem
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
  getProducts(categoryId?: number, featured?: boolean, topSeller?: boolean): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
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
  
  // Wishlist
  getWishlistItems(userId: number): Promise<(WishlistItem & { product: Product })[]>;
  addToWishlist(wishlistItem: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private products: Map<number, Product> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  private wishlistItems: Map<number, WishlistItem> = new Map();
  
  private currentUserId = 1;
  private currentCategoryId = 1;
  private currentProductId = 1;
  private currentCartItemId = 1;
  private currentOrderId = 1;
  private currentOrderItemId = 1;
  private currentWishlistItemId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      { name: "Traditional Wear", slug: "traditional-wear", description: "Authentic African traditional clothing", image: "/src/assets/wed.png" },
      { name: "Modern African", slug: "modern-african", description: "Contemporary African-inspired fashion", image: "/src/assets/wed2.png" },
      { name: "Accessories", slug: "accessories", description: "Traditional African accessories and jewelry", image: "/src/assets/wed3.png" },
      { name: "Headwraps", slug: "headwraps", description: "Premium African headwraps and Gele", image: "/src/assets/wed4.png" },
      { name: "Ceremonial", slug: "ceremonial", description: "Special occasion and ceremonial wear", image: "/src/assets/wed5.png" },
      { name: "Footwear", slug: "footwear", description: "Authentic African footwear and sandals", image: "/src/assets/wed6.png" },
      { name: "Bags", slug: "bags", description: "Handcrafted African bags and purses", image: "/src/assets/wed7.png" },
      { name: "Jewelry", slug: "jewelry", description: "Traditional African beads and jewelry", image: "/src/assets/wed8.png" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Generate comprehensive product data
    const productNames = [
      "Royal Ankara Dress", "Traditional Agbada Set", "Modern Dashiki Shirt",
      "Elegant Kente Wrap", "Ceremonial Gele Headwrap", "Handwoven Adire Tunic",
      "Contemporary African Blazer", "Traditional Boubou Robe", "Stylish Kaftan Dress",
      "Authentic Mud Cloth Jacket", "Vibrant Wax Print Skirt", "Classic Aso Oke Set",
      "Designer African Jumpsuit", "Traditional Wedding Attire", "Modern African Suit",
      "Elegant Evening Gown", "Casual African Print Top", "Formal Ceremony Outfit",
      "Trendy African Accessories", "Handcrafted Jewelry Set", "Traditional Footwear",
      "Modern African Bag", "Ceremonial Crown", "Stylish Head Piece",
      "Contemporary African Coat", "Traditional Dance Costume", "Modern Fusion Wear",
      "Elegant African Scarf", "Designer Handbag", "Traditional Sandals",
      "Ankara Print Blazer", "Kente Stole", "Adire Wrap Dress",
      "Dashiki Tunic", "Boubou Caftan", "Aso Ebi Set",
      "African Print Palazzo", "Traditional Wrapper", "Modern Agbada",
      "Elegant Buba", "Stylish Iro", "Contemporary Gele",
      "African Print Kimono", "Traditional Fila", "Modern Sokoto",
      "Elegant Buba and Wrapper", "Stylish Agbada Set", "Contemporary Dashiki",
      "African Print Maxi", "Traditional Headtie", "Modern Buba",
      "Elegant Wrapper Set", "Stylish Kaftan", "Contemporary Boubou",
      "African Print Shirt", "Traditional Cap", "Modern Wrapper",
      "Elegant Dashiki", "Stylish Agbada", "Contemporary Buba",
      "African Print Dress", "Traditional Gown", "Modern Tunic"
    ];

    const styles = [
      "Ankara", "Kente", "Adire", "Dashiki", "Agbada", "Boubou", 
      "Kaftan", "Gele", "Aso Oke", "Mud Cloth", "Wax Print", "Batik"
    ];

    const baseImages = [
      "/src/assets/wed.png", "/src/assets/wed2.png", "/src/assets/wed3.png",
      "/src/assets/wed4.png", "/src/assets/wed5.png", "/src/assets/wed6.png",
      "/src/assets/wed7.png", "/src/assets/wed8.png", "/src/assets/wed9.png"
    ];

    // Generate 60 products
    for (let i = 0; i < 60; i++) {
      const categoryId = Math.floor(Math.random() * categoriesData.length) + 1;
      const style = styles[Math.floor(Math.random() * styles.length)];
      const baseName = productNames[i % productNames.length];
      const price = (Math.floor(Math.random() * 200) + 30).toFixed(2);
      const image = baseImages[Math.floor(Math.random() * baseImages.length)];
      
      const product: Product = {
        id: this.currentProductId++,
        name: `${baseName} - ${style}`,
        description: `Authentic ${style} design featuring traditional patterns and modern comfort. Perfect for cultural celebrations and contemporary styling. Made with premium materials and expert craftsmanship.`,
        price: price,
        categoryId: categoryId,
        images: [image, baseImages[(i + 1) % baseImages.length], baseImages[(i + 2) % baseImages.length]],
        stock: Math.floor(Math.random() * 50) + 5,
        featured: Math.random() > 0.7,
        topSeller: Math.random() > 0.8,
        createdAt: new Date()
      };
      
      this.products.set(product.id, product);
    }
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
  async getProducts(categoryId?: number, featured?: boolean, topSeller?: boolean): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (categoryId) {
      products = products.filter(p => p.categoryId === categoryId);
    }
    
    if (featured !== undefined) {
      products = products.filter(p => p.featured === featured);
    }
    
    if (topSeller !== undefined) {
      products = products.filter(p => p.topSeller === topSeller);
    }
    
    return products;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    const searchQuery = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery)
    );
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
      topSeller: insertProduct.topSeller || false,
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

  // Wishlist
  async getWishlistItems(userId: number): Promise<(WishlistItem & { product: Product })[]> {
    const userWishlistItems = Array.from(this.wishlistItems.values()).filter(item => item.userId === userId);
    return userWishlistItems.map(item => ({
      ...item,
      product: this.products.get(item.productId)!
    }));
  }

  async addToWishlist(insertWishlistItem: InsertWishlistItem): Promise<WishlistItem> {
    const wishlistItem: WishlistItem = {
      id: this.currentWishlistItemId++,
      userId: insertWishlistItem.userId,
      productId: insertWishlistItem.productId,
      createdAt: new Date()
    };
    this.wishlistItems.set(wishlistItem.id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: number): Promise<void> {
    this.wishlistItems.delete(id);
  }
}

export const storage = new MemStorage();