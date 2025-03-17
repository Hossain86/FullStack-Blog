import { useEffect, useState } from "react";

interface User {
  username: string;
  profilePic?: string; // Assuming this is part of the user data
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3030/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          // In case the user is not found or token is invalid
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, setUser };
};

export default useAuth;
