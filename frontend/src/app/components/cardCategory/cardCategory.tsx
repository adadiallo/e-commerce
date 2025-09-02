"use client";

import { useEffect, useState } from "react";

type Categorie = {
  id: number;
  nom: string;
};

type Props = {
  onSelectCategorie: (id: number) => void;
};

export default function CategorieCard({ onSelectCategorie }: Props) {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://e-commerce-6-uf80.onrender.com/categories"); // ton endpoint
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du fetch des catégories :", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-[#0c5e69]">Catégories</h3>
      <ul className="flex flex-col divide-y divide-gray-200">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelectCategorie(cat.id)}
            className="py-2 cursor-pointer hover:bg-[#f0fdfd] transition-colors"
          >
            {cat.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}
