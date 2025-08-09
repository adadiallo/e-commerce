import ProductTable from "../components/ajoutProduit";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AjoutPage() {
  return (<ProtectedRoute><ProductTable /></ProtectedRoute> )
}