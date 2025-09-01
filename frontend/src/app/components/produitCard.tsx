"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";

export type Product = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
};

export default function ProductCard({ produit }: { produit: Product }) {
  const { refreshCount } = useCart();
  const [zoomOuvert, setZoomOuvert] = useState(false);

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
        toast.success('Produit ajoute au panier')
        const data = await response.json();
        localStorage.setItem("panier", JSON.stringify(data));
        await refreshCount();
      } else {
        console.error("Erreur API:", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de l’ajout au panier", error);
    }
  };

  return (
    <>
      <div className="bg-white text-[#0c5e69] rounded-xl shadow-md m-4 border border-transparent transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0c5e69]/30">
        {/* Image clickable */}
        <div
          className="relative w-full h-52 cursor-pointer rounded-t-xl overflow-hidden"
          onClick={() => setZoomOuvert(true)}
        >
          <Image
            src={produit.image || "/placeholder.png"}
            alt={produit.nom}
            fill
            className="object-cover w-full h-full transition-transform duration-300"
          />
        </div>

        <div className="p-4">
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
      </div>

      {/* Zoom plein écran avec icône X */}
      {zoomOuvert && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20"
            onClick={() => setZoomOuvert(false)}
          >
<IoIosClose  size={32}/>
          </button>
          <div className="relative w-[90%] max-w-[1000px] h-[90%]">
            <Image
              src={produit.image || "/placeholder.png"}
              alt={produit.nom}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
