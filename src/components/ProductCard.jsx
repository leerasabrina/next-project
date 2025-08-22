"use client";

import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  return (
    <div className=" rounded-lg shadow-md p-4 hover:shadow-xl transition">
      <img src={product.imageUrl || "/placeholder.png"} alt={product.name} className="w-full h-32 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600  line-clamp-2">{product.description}</p>
      <p className="font-semibold ">৳{product.price}</p>
      <button onClick={() => router.push(`/products/${product._id}`)} className="mt-3 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">View Details</button>
    </div>
  );
}
