import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Admin {
  id: string;
  username: string;
}

interface AdminContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("adminToken"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("adminToken");
      if (storedToken) {
        try {
          const response = await fetch("/api/admin/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setAdmin(data.admin);
            setToken(storedToken);
          } else {
            localStorage.removeItem("adminToken");
            setToken(null);
            setAdmin(null);
          }
        } catch (error) {
          localStorage.removeItem("adminToken");
          setToken(null);
          setAdmin(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setAdmin(data.admin);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Хатогӣ рух дод" };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    localStorage.removeItem("adminToken");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, token, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
