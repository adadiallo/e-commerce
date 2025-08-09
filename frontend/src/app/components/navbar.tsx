"use client";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";



export default function Navbar() {
  const router = useRouter();
  const { count } = useCart();

const { user, loading } = useUser();


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c5e69] text-white shadow-md px-6 p-8 flex justify-between items-center">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        AdaShop
      </div>

      <ul className="hidden md:flex gap-6 text-md font-medium">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="#">Produits</Link>
        </li>
        <li>
          <Link href="#">À propos</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
        <button
          className="relative text-white hover:text-[#f5c542]"
          onClick={() => router.push("/panier")}
        >
          <LuShoppingCart size={28} />
          {count >= 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#0c5e69] text-sm font-bold px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </button>

        {!loading && user ? (
  <span className="bg-white text-[#0c5e69] px-4 py-1 rounded-md text-md">
    {user.prenom}
  </span>
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
