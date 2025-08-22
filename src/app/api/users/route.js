import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { name, email, photoURL, uid } = await req.json();

  if (!email) return new Response(JSON.stringify({ message: "Email required" }), { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("lastDb");

    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      await db.collection("users").insertOne({ name, email, photoURL, uid });
    }

    return new Response(JSON.stringify({ message: "User saved successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
