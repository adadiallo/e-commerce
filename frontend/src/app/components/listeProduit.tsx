'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './produitCard';
import Navbar from './navbar';

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
};

export default function ListeProduits() {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch('http://localhost:3000/produits');
        const data = await res.json();
        setProduits(data);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
      }
    };

    fetchProduits();
  }, []);

  return (
    
    <div className="">
     
        <Navbar/>
            <div className="mt-8">

      <h1 className="text-2xl font-bold mb-4 ">Produits disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        {produits.map((produit) => (
          <ProductCard key={produit.id} produit={produit} />
        ))}
      </div>
      </div>
    </div>
  );
}
