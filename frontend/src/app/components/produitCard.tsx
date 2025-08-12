"use client";

import { useCart } from "../context/CartContext";

export type Product = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
};

export default function ProductCard({ produit }: { produit: Product }) {
  const { refreshCount } = useCart(); // ✅ Hook pour rafraîchir le compteur

 const handleAjouterAuPanier = async (produitId: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour ajouter un produit au panier.");
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/panier/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        produitId,
        quantite: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Récupération des données JSON
      localStorage.setItem("panier", JSON.stringify(data)); // Stockage dans localStorage
      console.log("Produit ajouté au panier",data);
      await refreshCount(); // Met à jour le compteur après succès
    } else {
      console.error("Erreur API:", await response.text());
    }
  } catch (error) {
    console.error("Erreur lors de l’ajout au panier", error);
  }
};


  return (
    <>
    <div className="bg-white text-[#0c5e69] rounded-xl shadow-md p-4 m-4 border border-transparent transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0c5e69]/30">
      <img
        src={produit.image}
        alt={produit.nom}
        className="w-full h-52 object-cover rounded-md mb-3 border border-transparent"
      />
      <h2 className="text-lg font-bold">{produit.nom}</h2>
      <p className="text-sm text-[#3a6f7b] mt-1">{produit.description}</p>
      <p className="text-[#0c5e69] font-semibold mt-2">{produit.prix} FCFA</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleAjouterAuPanier(produit.id)}
          className="bg-[#0c5e69] text-white hover:bg-[#094e4f] px-3 py-1 rounded-md text-sm transition duration-300"
        >
          Ajouter au panier
        </button>

       
      </div>
    </div>
    </>
  );
}
