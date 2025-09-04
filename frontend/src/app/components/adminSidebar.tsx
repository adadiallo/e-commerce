import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin({ onLinkClick }: { onLinkClick: () => void }) {
  const pathname = usePathname();

  const links = [
    { name: "Liste Produits", href: "/admin/produits" },
    { name: "Liste Catégories", href: "/admin/categories" },
    { name: "Commandes", href: "/admin/commandes" },
        { name: "Liste Utilisateurs", href: "/admin/utilisateurs" },

  ];

  return (
    <nav className="flex flex-col h-full p-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`p-2 mb-2 rounded ${
              isActive ? "bg-white text-[#0c5e69] font-semibold" : "text-white hover:bg-[#094e57]"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
