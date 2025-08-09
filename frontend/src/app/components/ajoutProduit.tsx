"use client";

import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

type Produit = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image?: string;
};

export default function ProductTable() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);

  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    image: "",
  });

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    const res = await fetch("http://localhost:3000/produits");
    const data = await res.json();
    setProduits(data);
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error("Erreur lors de l’upload vers Cloudinary", error);
      alert("Échec de l’upload de l’image.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitProduit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nom: form.nom,
      description: form.description,
      prix: parseFloat(form.prix),
      image: form.image,
    };

    const url = selectedProduit
      ? `http://localhost:3000/produits/${selectedProduit.id}`
      : `http://localhost:3000/produits`;

    const method = selectedProduit ? "PATCH" : "POST";
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json", // On précise qu'on envoie du JSON

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      setForm({ nom: "", description: "", prix: "", image: "" });
      setSelectedProduit(null);
      fetchProduits();
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Supprimer ce produit ?");
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/produits/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProduits(); // Pour rafraîchir la liste après suppression
    }
  };

  return (
    <>
    
   <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0c5e69]">
          Liste des produits
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0c5e69] text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Ajouter
        </button>
      </div>

      <table className="w-full border border-gray-200">
        <thead className="bg-[#0c5e69] text-left text-white">
          <tr>
            <th className="p-2 ">Nom</th>
            <th className="p-2">Description</th>
            <th className="p-2">Prix</th>
            {/* <th className="p-2">Image</th> */}

            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((prod) => (
            <tr key={prod.id} className="border-t">
              <td className="p-2 ">{prod.nom}</td>
              <td className="p-2">{prod.description}</td>
              <td className="p-2">{prod.prix} FCFA</td>
              {/* <td>
                {prod.image ? (
                  <img
                    src={prod.image}
                    alt={prod.nom}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <span className="text-red-500">Aucune image</span>
                )}
              </td> */}

              <td className="p-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduit(prod);
                    setForm({
                      nom: prod.nom,
                      description: prod.description,
                      prix: prod.prix.toString(),
                      image: prod.image || "",
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold text-[#0c5e69] mb-4">
              {selectedProduit ? "Modifier le produit" : "Ajouter un produit"}
            </h2>
            <form
              onSubmit={handleSubmitProduit}
              className="flex flex-col gap-4"
            >
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
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
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

    </>
  );
}
