"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function generateRandomPriceData() {
  const data = [];
  let price = Math.round(100 + Math.random() * 100);
  for (let i = 0; i < 10; i++) {
    price += Math.round((Math.random() - 0.5) * 10);
    data.push({
      date: `2024-07-${String(i + 1).padStart(2, "0")}`,
      price: Math.max(10, price),
    });
  }
  return data;
}

export default function ChartPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<{ date: string; price: number }[]>([]);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    fetch("/api/products")
      .then((res) => res.json())
      .then((products) => {
        const found = products.find((p: any) => (p._id || p.id) === params.id);
        setProduct(found);
      });
    setData(generateRandomPriceData());
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          ← Back
        </Button>
        <h1 className="text-2xl font-bold mb-2">
          {product ? product.name : "Product"} Price Chart
        </h1>
        <p className="mb-6 text-gray-600">{product?.description}</p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Footer />
    </div>
  );
}