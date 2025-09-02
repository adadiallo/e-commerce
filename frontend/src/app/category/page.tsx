'use client';

import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

type Categorie = {
  id: number;
  nom: string;
};

export default function ListeCategories() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);
  const [form, setForm] = useState({ nom: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("https://e-commerce-6-uf80.onrender.com/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      toast.error("Veuillez entrer un nom !");
      return;
    }

    const token = localStorage.getItem("token");
    const loadingToast = toast.loading("Patientez...");

    try {
      let res;
      if (selectedCategorie) {
        // Modifier
        res = await fetch(`https://e-commerce-6-uf80.onrender.com/categories/${selectedCategorie.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nom: form.nom }),
        });
        if (res.ok) toast.success("Catégorie modifiée !", { id: loadingToast });
        else toast.error("Erreur lors de la modification !", { id: loadingToast });
      } else {
        // Ajouter
        res = await fetch("https://e-commerce-6-uf80.onrender.com/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nom: form.nom }),
        });
        if (res.ok) toast.success("Catégorie ajoutée !", { id: loadingToast });
        else toast.error("Erreur lors de l'ajout !", { id: loadingToast });
      }

      if (res.ok) {
        setShowModal(false);
        setSelectedCategorie(null);
        setForm({ nom: "" });
        fetchCategories();
      }
    } catch (error) {
      toast.error("Une erreur est survenue !", { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    const token = localStorage.getItem("token");
    const loadingToast = toast.loading("Patientez...");

    try {
      const res = await fetch(`https://e-commerce-6-uf80.onrender.com/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) toast.success("Catégorie supprimée !", { id: loadingToast });
      else toast.error("Erreur lors de la suppression !", { id: loadingToast });
      fetchCategories();
    } catch {
      toast.error("Une erreur est survenue !", { id: loadingToast });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0c5e69]">Liste des catégories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0c5e69] text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Ajouter
        </button>
      </div>

      <table className="w-full border border-gray-200">
        <thead className="bg-[#0c5e69] text-white text-left">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t hover:bg-blue-50">
              <td className="p-2">{cat.nom}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategorie(cat);
                    setForm({ nom: cat.nom });
                    setShowModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Ajout/Édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold text-[#0c5e69] mb-4">
              {selectedCategorie ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={form.nom}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#0c5e69] text-white px-4 py-2 rounded"
                >
                  {selectedCategorie ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
