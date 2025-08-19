'use client';

import React, { useEffect, useState } from 'react';

type Commande = {
  id: number;
  utilisateur: {
    id: number;
    nom: string;
    email: string;
  };
  produits: {
    id: number;
    nom: string;
    prix: number;
    quantite: number;
  }[];
  total: number;
  statut: string;
  createdAt: string;
};

export default function ListeCommandes() {
  const [commandes, setCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/commandes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCommandes(data);
      } catch (err) {
        console.error('Erreur chargement commandes:', err);
      }
    };

    fetchCommandes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Commandes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#0c5e69] text-white">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Utilisateur</th>
              <th className="p-2 text-left">Produits</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((cmd) => (
              <tr key={cmd.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{cmd.id}</td>
                <td className="p-2">{cmd.utilisateur.nom}</td>
                <td className="p-2">
                  {cmd.produits.map((p) => (
                    <div key={p.id}>
                      {p.nom} x {p.quantite}
                    </div>
                  ))}
                </td>
                <td className="p-2">{cmd.total} FCFA</td>
                <td className="p-2">{cmd.statut}</td>
                <td className="p-2">{new Date(cmd.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
