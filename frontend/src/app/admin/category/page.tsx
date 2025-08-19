
import ListeCategories from "@/app/category/page";
import DashboardCards from "@/app/countTable/page";
import DashboardPage from "@/app/dashboard/page";



export default function AdminCategoriesPage() {
  return (
    <DashboardPage>
      <DashboardCards/>
      <ListeCategories/>
    </DashboardPage>
  );
}
