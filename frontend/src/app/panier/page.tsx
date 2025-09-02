'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Image from 'next/image';

type ProduitPanier = {
  id: number;
  nom: string;
  image?: string;
  prix: number;
  quantite: number;
};

export default function PanierPage() {
  const [produits, setProduits] = useState<ProduitPanier[]>([]);
  const [chargement, setChargement] = useState(true);
  const { refreshCount } = useCart();

  // Charger le panier depuis l'API
  const fetchPanier = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://e-commerce-6-uf80.onrender.com/panier', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error('Erreur lors du chargement du panier :', error);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    fetchPanier();
  }, []);

  // Modifier la quantité
  const modifierQuantite = async (produitId: number, quantite: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (quantite < 1) return;

    try {
      await fetch(`https://e-commerce-6-uf80.onrender.com/panier/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ produitId, quantite }),
      });

      fetchPanier();
      refreshCount();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  // Supprimer un produit
  const supprimerProduit = async (produitId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch(`https://e-commerce-6-uf80.onrender.com/panier/remove/${produitId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPanier();
      refreshCount();
    } catch (error) {
      console.error('Erreur suppression produit :', error);
    }
  };

  // Valider la commande
 // Valider la commande et payer avec Stripe
const validerCommande = async () => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Vous devez être connecté");

  try {
    const res = await fetch("https://e-commerce-6-uf80.onrender.com/commandes/valider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currency: 'xof' }),
    });

    if (!res.ok) {
      alert("Erreur lors de la validation de la commande");
      return;
    }

    const data = await res.json();

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      alert("Pas d'URL de paiement reçue");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau");
  }
};




  const totalPanier = produits.reduce((total, p) => total + p.prix * p.quantite, 0);

  if (chargement) return <p>Chargement du panier...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-30">
        <h1 className="text-2xl font-bold mb-4 text-[#0c5e69]">Mon Panier</h1>

        {produits.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <>
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={produit.image ||"/placeholder.png"}
                    alt={produit.nom}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{produit.nom}</h2>
                    <p>{produit.prix} FCFA</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => modifierQuantite(produit.id, produit.quantite - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{produit.quantite}</span>
                  <button
                    onClick={() => modifierQuantite(produit.id, produit.quantite + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => supprimerProduit(produit.id)}
                    className="text-red-500 ml-4 text-2xl"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <p className="text-lg font-bold">
                Total : {totalPanier.toLocaleString()} FCFA
              </p>
              <button
                onClick={validerCommande}
                className="mt-2 bg-[#0c5e69] text-white px-4 py-2 rounded hover:bg-[#094e4f]"
              >
                Valider la commande
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
