"use client";

import ProduitManager from "@/app/components/ajoutProduit";
import DashboardLayout from "@/app/components/dashboard";



export default function ProduitsPage() {
  return (
    <DashboardLayout>
      <ProduitManager />
    </DashboardLayout>
  );
}
