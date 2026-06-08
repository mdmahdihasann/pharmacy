"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProductDialog() {
  return (
    <DialogContent className="sm:max-w-2xl bg-white rounded-xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Add Product</DialogTitle>
      </DialogHeader>

      {/* FORM START */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* SKU */}
        <div className="space-y-2">
          <Label>SKU</Label>
          <Input name="sku" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="SKU-001" />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input name="name" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="Paracetamol 500mg" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label>Price</Label>
          <Input name="price" type="number" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="0.00" />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label>Weight</Label>
          <Input name="weight" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="500mg / 1kg" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Input name="category" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="Medicine / Beauty" />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label>Stock</Label>
          <Input name="stock" type="number" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="100" />
        </div>
        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={4}
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="Write product details..."
          />
        </div>

        {/* Images */}
        <div className="space-y-2 md:col-span-2">
          <Label>Image</Label>
          <Input type="file" name="images" className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1" placeholder="url1, url2, url3" />
        </div>

        {/* FORM ACTIONS */}
        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="border border-gray-400 hover:border-gray-500 transition">Cancel</Button>
          </DialogClose>

          <Button type="submit" className="bg-[#2dc67b] border border-[#2dc67b] text-white">Save Product</Button>
        </div>
      </form>
    </DialogContent>
  );
}
