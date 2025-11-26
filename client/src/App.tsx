import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AdminProvider } from "@/lib/AdminContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Patients from "@/pages/Patients";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBanners from "@/pages/admin/Banners";
import AdminNews from "@/pages/admin/News";

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/patients" component={Patients} />
      <Route path="/contacts" component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/banners" component={AdminBanners} />
      <Route path="/admin/news" component={AdminNews} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminRouter />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PublicRouter />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AdminProvider>
            <AppContent />
            <Toaster />
          </AdminProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
