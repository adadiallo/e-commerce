'use client';

import DashboardLayout from "@/app/components/dashboard";
import ListeUtilisateurs from "@/app/components/listeUtilisateurs";



export default function AdminUtilisateursPage() {
  return (
    <DashboardLayout>
      <ListeUtilisateurs/>
    </DashboardLayout>
      
  );
}
