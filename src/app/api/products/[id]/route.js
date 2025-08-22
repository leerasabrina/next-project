
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    console.log(id);
    const client = await clientPromise;
    const db = client.db("lastDb");
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid ID or server error" }, { status: 500 });
  }
}