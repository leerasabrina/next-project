import ProductCard from "@/components/ProductCard";
import AddProductForm from "@/components/AddProductForm";

async function fetchProducts() {
//   const res = await fetch(`https://last-cnepb3lix-sabrina-hossains-projects.vercel.app/api/products`, { cache: "no-store" });
const res = await fetch("/api/products", { cache: "no-store" });

  return res.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <AddProductForm />
      <h1 className="text-2xl font-bold text-center mt-6 mb-4">Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
