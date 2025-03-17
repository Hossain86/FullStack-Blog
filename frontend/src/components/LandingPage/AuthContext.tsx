import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    // Try to get user from localStorage initially
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Try to fetch the user from localStorage first
    const token = localStorage.getItem("token");

    if (user) {
      setLoading(false);
      return; // If user is already set, no need to fetch again
    }

    if (token) {
      // If a token exists but no user data, fetch user details
      const fetchUserData = async () => {
        try {
          const response = await fetch("https://full-stack-blog-api.vercel.app/api/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data)); // Sync user data
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setLoading(false);
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Sync localStorage when `user` updates
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
