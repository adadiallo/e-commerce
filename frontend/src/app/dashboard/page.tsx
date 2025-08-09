"use client";

import { useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import SidebarAdmin from "../components/adminSidebar";
import ProductTable from "../components/ajoutProduit";

export default function DashboardPage({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar avec bouton pour ouvrir la sidebar sur mobile */}
      <AdminNavbar>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-white text-2xl px-3 py-1 rounded hover:bg-[#094e57]"
          aria-label="Toggle sidebar"
        >
          {/* Icône hamburger simple */}
          ☰
        </button>
      </AdminNavbar>

      <div className="flex flex-1 pt-8"> {/* pt-20 pour laisser place à la navbar fixe */}
        {/* Sidebar responsive */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-[#0c5e69] text-white shadow-lg
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static md:flex-shrink-0
          `}
        >
          <SidebarAdmin onLinkClick={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 ml-0 ">
          {children}
        </main>
      </div>
    </div>
  );
}
