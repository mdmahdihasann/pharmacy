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
import { useForm } from "react-hook-form";
import { FormDataType } from "@/types/ProductForm";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function ProductDialog({onSuccess, setOpen}:{setOpen: (v: boolean) => void; onSuccess: any}) {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
    setValue,
  } = useForm<FormDataType>();

  useEffect(() => {
    const fetachCategory = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    fetachCategory();
  }, []);

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    formData.append("sku", data.sku);
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("weight", data.weight);
    formData.append("stock", data.stock.toString());
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    const file = data.images?.[0];
    if (file) {
      formData.append("images", file);
    }
    try {
      await api.post("/products", formData);
      toast.success("Category created successfully!");
      onSuccess?.();
      setOpen(false);
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl bg-white rounded-xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Add Product</DialogTitle>
      </DialogHeader>

      {/* FORM START */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SKU */}
        <div className="space-y-2">
          <Label>SKU</Label>
          <Input
            {...register("sku", { required: "Sku is required" })}
            name="sku"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="sku"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input
            {...register("name", { required: "Product Name is required" })}
            name="name"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="product name"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            {...register("price", { required: "Price is required" })}
            name="price"
            type="number"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="price"
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label>Weight</Label>
          <Input
            {...register("weight", { required: "Weight is required" })}
            name="weight"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="weight"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            name="categoryId"
            className="w-full py-1.5 rounded-md border border-gray-300 px-3 text-sm hover:border-gray-400 focus:outline-none focus:border-[#2dc67b] focus:ring-1 focus:ring-[#2dc67b]"
            defaultValue=""
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat?.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label>Stock</Label>
          <Input
            {...register("stock", { required: "Stock is required" })}
            name="stock"
            type="number"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="stock"
          />
        </div>
        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            name="description"
            rows={4}
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="Write product details..."
          />
        </div>

        {/* Images */}
        <div className="space-y-2 md:col-span-2">
          <Label>Image</Label>
          <Input
            {...register("images", { required: "Image is required" })}
            type="file"
            name="images"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="url1, url2, url3"
          />
        </div>

        {/* FORM ACTIONS */}
        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-gray-400 hover:border-gray-500 transition"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            className="bg-[#2dc67b] border border-[#2dc67b] text-white"
          >
            Save Product
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
