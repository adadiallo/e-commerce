"use client";

import Link from "next/link";
import { LuShoppingCart, LuLogOut } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const { count } = useCart();
  const { user, loading, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c5e69] text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        AdaShop
      </div>

    
<div className="flex-1 flex justify-center px-6">
  <input
    type="search"
    placeholder="Rechercher..."
    className="w-full max-w-md px-4 py-2 rounded-full
               border border-white/70 bg-transparent text-white
               placeholder-white/70
               focus:outline-none focus:border-white focus:ring-0"
  />
</div>



      {/* Côté droit */}
      <div className="flex gap-6 items-center relative">
        {/* Téléphone */}
        <div className="flex items-center gap-2">
          <FaPhoneAlt size={18} />
          <p>781452667</p>
        </div>

        {/* Panier */}
        <button
          className="relative text-white hover:text-[#f5c542]"
          onClick={() => router.push("/panier")}
        >
          <LuShoppingCart size={28} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#0c5e69] text-sm font-bold px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </button>

        {/* Utilisateur connecté */}
        {!loading && user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white text-[#0c5e69] px-3 py-1 rounded-md"
              onClick={() => setOpen(!open)}
            >
              <IoMdPerson size={20} />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-[#0c5e69] rounded-md shadow-lg overflow-hidden">
                <div className="px-4 py-2 font-medium border-b">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <LuLogOut size={18} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : !loading ? (
          <Link
            href="/login"
            className="bg-white text-[#0c5e69] px-4 py-1 rounded-md text-md"
          >
            Se connecter
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
