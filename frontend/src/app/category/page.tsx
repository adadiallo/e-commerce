"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function AjoutCategorie() {
  const [nom, setNom] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
const token=localStorage.getItem('token');
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ nom }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l’ajout de la catégorie");
      }

      alert("Catégorie ajoutée avec succès !");
      setNom("");
    } catch (err) {
      console.error(err);
      alert("Impossible d’ajouter la catégorie");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
         <div className="flex text-right mb-4">
             
               <button
                 className="bg-[#0c5e69] text-white px-4 py-2 rounded flex items-right gap-2"
               >
                 <FiPlus /> Ajouter une categorie
               </button>
             </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Robes, Ensembles, Chaussures"
              className="w-full px-3 py-2 border border-[#0c5e69]  rounded-xl focus:outline-none focus:ring-2] "
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#0c5e69] 0 text-white py-2 rounded-xl hover:bg-[#0c5e69]  transition"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
