"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send data to API route
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Product added successfully!");
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-50 p-4 rounded shadow-md max-w-md mx-auto flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2 mb-2" required/>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2 mb-2" />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border rounded p-2 mb-2" required/>
      <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full border rounded p-2 mb-2"/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Product</button>
    </form>
  );
}
