"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CategorieCard from "../components/cardCategory/cardCategory";

type Produit = {
  nom: string;
  image: string;
};

const produits: Produit[] = [
  { nom: "Robe et Himare", image: "/479b30da3d5a9be6680b4522d20cbc44.jpg" },
  { nom: "Robe longue", image: "/036e2772943ef95eb91a757bfc9ff070.jpg" },
  { nom: "Voile coloré", image: "/619cf1fd8a6d2a18e57b17a5e32bbf3d.jpg" },
    { nom: "Ensemble Kimino", image: "/cddb85c09d886ec54e1057e05095563c.jpg" },

  { nom: "Accessoires hijab", image: "/78f3d86abce79c190cc68a0cfb362fda.jpg" },
    { nom: "Voiles", image: "/7938d28ea654fd8c2c6a11f4d4dcf4f8.jpg" },

];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
    const [selectedCategorie, setSelectedCategorie] = useState<number | null>(null);

  const handleSelectCategorie = (id: number) => {
    setSelectedCategorie(id);
    // Ici tu peux filtrer tes produits en fonction de cette catégorie
    console.log("Catégorie sélectionnée:", id);
  };

  // Défilement automatique toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % produits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + produits.length) % produits.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % produits.length);
  };

  return (
  <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto mt-30">
  {/* Carte catégories */}
  <div className="w-full md:w-80">
    <CategorieCard onSelectCategorie={handleSelectCategorie} />
  </div>

  {/* Banner slider */}
  <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden rounded-xl">
    {produits.map((produit, i) => (
      <div
        key={i}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          i === index ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={produit.image}
          alt={produit.nom}
          fill
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <h2 className="text-white text-xl md:text-3xl font-bold mb-2 drop-shadow-lg">
            {produit.nom}
          </h2>
          <p className="text-white text-sm md:text-lg mb-2 drop-shadow-md">
            Découvrez nos collections élégantes pour femmes
          </p>
          <a
            href="#produits"
            className="bg-[#0c5e69] hover:bg-[#094e4f] text-white px-4 md:px-6 py-1 md:py-2 rounded-full font-medium transition duration-300 text-sm md:text-base"
          >
            Voir la collection
          </a>
        </div>
      </div>
    ))}

    {/* Boutons précédent / suivant */}
    <button
      onClick={prevSlide}
      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 md:p-2 rounded-full"
    >
      ‹
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 md:p-2 rounded-full"
    >
      ›
    </button>
  </div>
</div>

  );
}
