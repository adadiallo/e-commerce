"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
};

export default function ListeUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://e-commerce-6-uf80.onrender.com/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des utilisateurs");

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
  
    <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
  {/* Titre */}
  <h2 className="text-xl font-semibold text-[#0c5e69] mb-4">
    Liste des utilisateurs
  </h2>

  {/* Tableau */}
  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
    <thead className="bg-[#0c5e69] text-white">
      <tr className=" ">
        <th className="p-2 text-left">ID</th>
        <th className="p-2 text-left">Nom</th>
        <th className="p-2 text-left">Prénom</th>
        <th className="p-2 text-left">Email</th>
      </tr>
    </thead>
    <tbody className="text-left bg-white">
      {users.map((user) => (
        <tr
          key={user.id}
          className="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td className="p-2">{user.id}</td>
          <td className="p-2">{user.nom}</td>
          <td className="p-2">{user.prenom}</td>
          <td className="p-2">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  
  );
}
