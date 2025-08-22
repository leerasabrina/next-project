import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {
  const client = await clientPromise;
  const db = client.db("lastDb"); 
  const product = await db.collection("products").findOne({ _id: new ObjectId(params.id) });
  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-GB")
    : "N/A";

  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="container mx-auto p-4">
      
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        className="w-full max-w-md h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-semibold ">{product.name}</h1>
      <p className="text-xl  font-semibold">{product.description}</p>
      <p className="font-semibold text-xl">price: ৳{product.price}</p>
      <p className="font-semibold text-xl">Created At: {formattedDate}</p>
    </div>
  );
}
