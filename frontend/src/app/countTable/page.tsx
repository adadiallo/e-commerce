"use client";

import { useEffect, useState } from "react";
import { FiShoppingCart, FiUsers, FiBox, FiList } from "react-icons/fi";

export default function DashboardCards() {
  const [totals, setTotals] = useState({
    produits: 0,
    commandes: 0,
    utilisateurs: 0,
    categories: 0,
  });

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async () => {
    try {
      const [produitsRes, commandesRes, usersRes, categoriesRes] = await Promise.all([
        fetch("http://localhost:3000/produits"),
        fetch("http://localhost:3000/commandes"),
        fetch("http://localhost:3000/users"),
        fetch("http://localhost:3000/categories"),
      ]);

      const produits = await produitsRes.json();
      const commandes = await commandesRes.json();
      const users = await usersRes.json();
      const categories = await categoriesRes.json();

      setTotals({
        produits: produits.length,
        commandes: commandes.length,
        utilisateurs: users.length,
        categories: categories.length,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des totaux:", err);
    }
  };

  const cards = [
    { title: "Produits", value: totals.produits, icon: <FiBox size={24} className="text-[#0c5e69]" /> },
    { title: "Commandes", value: totals.commandes, icon: <FiShoppingCart size={24} className="text-[#0c5e69]" /> },
    { title: "Utilisateurs", value: totals.utilisateurs, icon: <FiUsers size={24} className="text-[#0c5e69]" /> },
    { title: "Catégories", value: totals.categories, icon: <FiList size={24} className="text-[#0c5e69]" /> },
  ];

  return (
   <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
  {cards.map((card) => (
    <div
      key={card.title}
      className="flex items-center p-5 rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-3 bg-[#e6f3f4] rounded-full mr-4">
        {card.icon}
      </div>
      <div>
        <h3 className="text-gray-700 text-sm font-medium">{card.title}</h3>
        <p className="text-[#0c5e69] text-2xl font-bold">{card.value}</p>
      </div>
    </div>
  ))}
</div>

  );
}
