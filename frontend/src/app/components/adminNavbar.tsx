import Link from "next/link";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import router from "next/router";
import { LuLogOut } from "react-icons/lu";

export default function AdminNavbar({ children }: { children?: React.ReactNode }) {
    const { user, loading, logout } = useUser();
    const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c5e69] text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold cursor-pointer">AdaShop</div>

      <div className="md:hidden">{children}</div>

{!loading && user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white text-[#0c5e69] px-3 py-1 rounded-md"
              onClick={() => setOpen(!open)}
            >
              <IoMdPerson size={20} />
            </button>

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
    </nav>
  );
}
