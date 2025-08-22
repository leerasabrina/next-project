import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lastDb");
    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl } = body || {};

    // required fields check
    if (!name || !description || price === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    
    const parsedPrice = Number(price);

    
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Price must be a number" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("lastDb"); 

    const doc = {
      name: String(name),
      description: String(description),
      price: parsedPrice, 
      imageUrl: imageUrl ? String(imageUrl) : null,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(doc);

    return NextResponse.json(
      { insertedId: result.insertedId, ...doc },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error in POST:", e);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
