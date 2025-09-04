"use client";

import ListeCategories from "@/app/category/page";
import DashboardLayout from "@/app/components/dashboard";



export default function ProduitsPage() {
  return (
    <DashboardLayout>
      <ListeCategories/>
    </DashboardLayout>
  );
}
