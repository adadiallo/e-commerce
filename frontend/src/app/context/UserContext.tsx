"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  prenom: string;
  nom: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void; 
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {}, // valeur par défaut
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:3000/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // ✅ Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token"); // on supprime le token
    setUser(null); // on vide l'utilisateur
    router.push("/login"); // optionnel : redirection vers login
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
