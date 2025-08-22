
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import clientPromise from "@/lib/mongodb";


export default async function Home() {
  const client = await clientPromise;
  const db = client.db("lastDb");

  
  const latestProduct = await db
    .collection("products")
    .find()
    .sort({ date: -1 })
    .limit(8)
    .toArray();

    const products = latestProduct.map((product) => ({
  ...product,
  _id: product._id.toString(),
}));


  return (
    <div className="p-0 space-y-2">
      <Banner/>

      <h2 className="text-xl font-bold text-center mt-10">Latest Products</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1  lg:grid-cols-3 gap-10">
       
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

      </div>
    </div>
  );
}
