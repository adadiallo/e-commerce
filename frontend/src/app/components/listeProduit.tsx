'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './produitCard';
import Navbar from './navbar';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
};

export default function ListeProduits() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch('https://e-commerce-6-uf80.onrender.com/produits');
        const data = await res.json();
        setProduits(data);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
      }
    };

    fetchProduits();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(produits.length / productsPerPage);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="mt-8 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Produits disponibles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentProducts.map((produit) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>

        {/* Pagination avec icônes */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            <FiChevronLeft size={24} />
          </button>

          <span className="px-3 py-1">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 border rounded disabled:opacity-50"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
