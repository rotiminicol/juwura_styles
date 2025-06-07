import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import LoginModal from "@/components/LoginModal";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-cream">
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
        <CartSidebar />
        <LoginModal />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
