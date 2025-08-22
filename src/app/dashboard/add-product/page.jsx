import AddProductForm from "@/components/AddProductForm";
import PrivateRoute from "@/components/PrivateRoute";



export default function AddProductPage() {
  return (
    <PrivateRoute><div className="container mx-auto p-4">
     
      <AddProductForm/>
    </div></PrivateRoute>
    
  );
}
