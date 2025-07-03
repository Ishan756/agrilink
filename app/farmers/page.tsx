"use client";
import { Header } from '@/components/layout/header';
import React, { useState } from 'react';

const initialForm = {
  name: '',
  description: '',
  price: '',
  basePrice: '',
  image: '',
  category: '',
  farmerName: '',
  farmerRating: '',
  quantity: '',
  unit: '',
  organic: false,
  grade: '',
  region: '',
  averageRating: '',
};

export default function FarmerPage() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send data to API to save to MongoDB
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: { current: parseFloat(form.price), base: parseFloat(form.basePrice) },
        image: form.image,
        category: form.category,
        farmer: { name: form.farmerName, rating: parseFloat(form.farmerRating) },
        stock: { quantity: parseFloat(form.quantity), unit: form.unit },
        specifications: { organic: form.organic, grade: form.grade },
        location: { region: form.region },
        averageRating: parseFloat(form.averageRating),
      }),
    });
    if (res.ok) {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Add Your Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Product Name" className="w-full border rounded px-3 py-2" />
          <input name="description" value={form.description} onChange={handleChange} required placeholder="Description" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2">
            <input name="price" value={form.price} onChange={handleChange} required placeholder="Current Price" type="number" step="0.01" className="w-1/2 border rounded px-3 py-2" />
            <input name="basePrice" value={form.basePrice} onChange={handleChange} required placeholder="Base Price" type="number" step="0.01" className="w-1/2 border rounded px-3 py-2" />
          </div>
          <input name="image" value={form.image} onChange={handleChange} required placeholder="Image URL" className="w-full border rounded px-3 py-2" />
          <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="w-full border rounded px-3 py-2" />
          <div className="flex gap-2">
            <input name="farmerName" value={form.farmerName} onChange={handleChange} required placeholder="Farmer Name" className="w-1/2 border rounded px-3 py-2" />
            <input name="farmerRating" value={form.farmerRating} onChange={handleChange} required placeholder="Farmer Rating" type="number" step="0.1" className="w-1/2 border rounded px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <input name="quantity" value={form.quantity} onChange={handleChange} required placeholder="Stock Quantity" type="number" className="w-1/2 border rounded px-3 py-2" />
            <input name="unit" value={form.unit} onChange={handleChange} required placeholder="Unit (e.g. lbs)" className="w-1/2 border rounded px-3 py-2" />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" name="organic" checked={form.organic} onChange={handleChange} />
              Organic
            </label>
            <input name="grade" value={form.grade} onChange={handleChange} required placeholder="Grade" className="border rounded px-3 py-2" />
          </div>
          <input name="region" value={form.region} onChange={handleChange} required placeholder="Region" className="w-full border rounded px-3 py-2" />
          <input name="averageRating" value={form.averageRating} onChange={handleChange} required placeholder="Average Rating" type="number" step="0.1" className="w-full border rounded px-3 py-2" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition">Submit Product</button>
        </form>
        {success && <p className="text-green-700 mt-4 text-center">Product submitted! It will appear on the marketplace.</p>}
      </div>
    </div>
  );
}