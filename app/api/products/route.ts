import Product from "@/lib/models/product"; // <-- use lowercase if you rename the file
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const products = await Product.find().lean();
  return Response.json(products);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const product = await Product.create(data);
    return Response.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return Response.json({ error: error.message || "Server error" }, { status: 500 });
  }
}