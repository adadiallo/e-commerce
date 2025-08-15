// src/components/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0c5e69] text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-3">AdaShop</h2>
          <p className="text-sm">
            Boutique en ligne de vêtements élégants à petits prix. Livraison à Dakar et partout au Sénégal.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Liens rapides</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Accueil</Link></li>
            <li><Link href="#produits" className="hover:underline">Produits</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                        <li><Link href="/panier" className="hover:underline">Mon panier</Link></li>

          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Suivez-nous</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" className="hover:text-gray-300"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="https://wa.me/221781452667" target="_blank" className="hover:text-gray-300"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-300 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} AdaShop - Tous droits réservés
      </div>
    </footer>
  );
}
