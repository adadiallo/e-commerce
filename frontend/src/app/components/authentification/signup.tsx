'use client';

import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Inscription réussie :', data);
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l’inscription :', errorData.message);
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };



  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-transparent transition-all duration-300 hover:shadow-[#0c5e69]/20">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#0c5e69]">Inscription</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c5e69]/50 transition"
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c5e69]/50 transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c5e69]/50 transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0c5e69]/50 transition"
          required
        />
        
        <button
          type="submit"
          className="bg-[#0c5e69] text-white py-2 rounded hover:bg-[#094e57] transition duration-300"
        >
          S'inscrire
        </button>
        
        <p className="mt-2 text-center text-base">
          Vous avez déjà un compte ?{" "}
          <a className="text-[#0c5e69] hover:underline" href="/login">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  </div>
);

}
