'use client';

import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { setUser } = useUser(); // ✅ Récupère setUser

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("réponse backend :", data);

localStorage.setItem('token', data.access_token.access_token);

console.log("token reçu :",data.access_token.access_token);

console.log("type du token :", typeof data.access_token.access_token);

        const meRes = await fetch('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${data.access_token.access_token}`,
          },
        });

        if (meRes.ok) {
          toast.success("Connexion reussi!");
          const userData = await meRes.json();
          setUser(userData); 
            localStorage.setItem("users", JSON.stringify(userData));

          router.push('/');
        } else {
toast.error("Erreur lors de la connexion !");        }
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la connexion :', errorData.message);
        alert('Connexion échouée : ' + errorData.message);
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-transparent transition-all duration-300 hover:shadow-[#0c5e69]/20">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#0c5e69]">Connexion</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          className="bg-[#0c5e69] text-white py-2 rounded hover:bg-[#094e57] transition"
        >
          Se connecter
        </button>
        <p className="mt-2 text-center text-base">
          Vous n&apos;avez pas de compte ?{" "}
          <a className="text-[#0c5e69] hover:underline" href="/signup">
            S'inscrire
          </a>
        </p>
      </form>





      
    </div>
  </div>
);

}
