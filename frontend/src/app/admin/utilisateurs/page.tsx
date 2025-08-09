// app/admin/produits/page.tsx

import UserTable from "@/app/components/listeUtilisateurs";
import DashboardPage from "@/app/dashboard/page";



export default function AdminUtilisateursPage() {
  return (
    <DashboardPage>
      <UserTable/>
    </DashboardPage>
  );
}
