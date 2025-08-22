import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {
  const  id  = params?.id;
  const client = await clientPromise;
   

  const db = client.db("lastDb"); 

  let product;
  

  try {
    product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
   
  } catch (err) {
    return <p className="p-4">Invalid product ID</p>;
  }

  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="p-4">
      <h1>{product.name}</h1>
      <p>Created At: {formattedDate}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
}
