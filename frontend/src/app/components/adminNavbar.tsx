// components/adminNavbar.tsx
export default function AdminNavbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c5e69] text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold cursor-pointer">AdaShop</div>

      {/* Ici on affiche le bouton hamburger passé en enfant (sur mobile) */}
      <div className="md:hidden">{children}</div>

      {/* Bouton déconnexion toujours visible */}
      <button className="hidden md:block bg-[#094e57] text-white px-4 py-1 rounded hover:bg-[#063b43]">
        Déconnexion
      </button>
    </nav>
  );
}
