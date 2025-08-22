import ProductCard from "@/components/ProductCard";

// Fetch products from API
async function fetchProducts() {
//   const res = await fetch(`https://last-cnepb3lix-sabrina-hossains-projects.vercel.app/api/products`, { cache: "no-store" });
const res = await fetch("/api/products", { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
