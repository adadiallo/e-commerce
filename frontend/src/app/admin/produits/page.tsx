// app/admin/produits/page.tsx

import ProductTable from "@/app/components/ajoutProduit";
import DashboardCards from "@/app/countTable/page";
import DashboardPage from "@/app/dashboard/page";



export default function AdminProduitsPage() {
  return (
    <DashboardPage>
      <DashboardCards/>
      <ProductTable />
    </DashboardPage>
  );
}
