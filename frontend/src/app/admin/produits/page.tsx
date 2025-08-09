// app/admin/produits/page.tsx

import ProductTable from "@/app/components/ajoutProduit";
import DashboardPage from "@/app/dashboard/page";



export default function AdminProduitsPage() {
  return (
    <DashboardPage>
      <ProductTable />
    </DashboardPage>
  );
}
