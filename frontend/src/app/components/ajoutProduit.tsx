"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

type Categorie = {
  id: number;
  nom: string;
};

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
  category?: Categorie;
};

export default function ProduitManager() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);

  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    imageFile: null as File | null,
    categoryId: "",
  });

  // Charger produits et catégories
  useEffect(() => {
    fetchProduits();
    fetchCategories();
  }, []);

  const fetchProduits = async () => {
    const res = await fetch("http://localhost:3000/produits");
    const data = await res.json();
    setProduits(data);
      console.log('DONNEES:',data); // <--- Vérifier la structure ici
  setProduits(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.categoryId) {
      alert("Veuillez choisir une catégorie !");
      return;
    }

    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("description", form.description);
    formData.append("prix", form.prix);
    formData.append("categoryId", form.categoryId);
    if (form.imageFile) formData.append("image", form.imageFile);

    const url = selectedProduit
      ? `http://localhost:3000/produits/${selectedProduit.id}`
      : "http://localhost:3000/produits";
    const method = selectedProduit ? "PATCH" : "POST";

    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setShowModal(false);
      setSelectedProduit(null);
      setForm({ nom: "", description: "", prix: "", imageFile: null, categoryId: "" });
      fetchProduits();
      
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/produits/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProduits();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0c5e69]">Liste des produits</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0c5e69] text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Ajouter
        </button>
      </div>

      {/* Tableau Produits */}
      <table className="w-full border border-gray-200">
        <thead className="bg-[#0c5e69] text-white text-left">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Description</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Catégorie</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((prod) => (
            <tr key={prod.id} className="border-t hover:bg-blue-50">
              <td className="p-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={prod.image || "/placeholder.png"}
                    alt={prod.nom}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              </td>
              <td className="p-2">{prod.nom}</td>
              <td className="p-2">{prod.description}</td>
              <td className="p-2">{prod.prix} FCFA</td>
              <td className="p-2">{prod.category?.nom || "-"}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduit(prod);
                    setForm({
                      nom: prod.nom,
                      description: prod.description,
                      prix: prod.prix.toString(),
                      imageFile: null,
                      categoryId: prod.category?.id.toString() || "",
                    });
                    setShowModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
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
              {selectedProduit ? "Modifier le produit" : "Ajouter un produit"}
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
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={form.prix}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
                required
              />
              {/* Select catégorie */}
              <select
                name="categorieId"
                value={form.categoryId}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
                required
              >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded"
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
                  {selectedProduit ? "Mettre à jour" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
