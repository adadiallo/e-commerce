// components/adminSidebar.tsx
import Link from "next/link";

type SidebarProps = {
  onLinkClick?: () => void;
};

export default function SidebarAdmin({ onLinkClick }: SidebarProps) {
  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mt-8">Admin Dashboard</h2>

      <nav className="flex flex-col gap-4 text-lg font-medium mt-4">
        <Link href="/admin/produits"  className="hover:bg-[#094e57] rounded px-3 py-2 transition block"
            onClick={onLinkClick}>
         
            Liste des produits
        
        </Link>

        <Link href="/admin/utilisateurs"  className="hover:bg-[#094e57] rounded px-3 py-2 transition block"
            onClick={onLinkClick}>
         
            Liste des utilisateurs
          
        </Link>

        <Link href="/admin/commandes"  className="hover:bg-[#094e57] rounded px-3 py-2 transition block"
            onClick={onLinkClick}>
         
            Liste des commandes
        </Link>
      </nav>
    </div>
  );
}
