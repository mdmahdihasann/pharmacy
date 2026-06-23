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

export default function ProductDialog({
  onSuccess,
  setOpen,
  pdData,
}: {
  setOpen: (v: boolean) => void;
  onSuccess: any;
  pdData: any;
}) {
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

  useEffect(() => {
    if (pdData) {
      setValue("sku", pdData.sku);
      setValue("name", pdData.name);
      setValue("price", pdData.price);
      setValue("salePrice", pdData.salePrice);
      setValue("genericName", pdData.genericName);
      setValue("stock", pdData.stock);
      setValue("description", pdData.description);
      setValue("packSize", pdData.packSize);
      setValue("strength", pdData.strength);
      setValue("dosageForm", pdData.dosageForm);
      setValue("manufacturer", pdData.manufacturer);
      setValue("prescriptionReq", pdData.prescriptionReq);
      setValue("status", pdData.status);
      setValue("expiryDate", pdData.expiryDate);
      setValue("categoryId", pdData.categoryId);
      setValue("images", pdData.images);
    } else {
      reset();
    }
  }, [setValue, pdData, reset]);

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    formData.append("sku", data.sku);
    formData.append("name", data.name);

    formData.append("price", data.price.toString());

    formData.append("salePrice", data.salePrice?.toString() || "");

    formData.append("stock", data.stock.toString());

    formData.append("genericName", data.genericName || "");
    formData.append("packSize", data.packSize || "");

    formData.append("strength", data.strength || "");
    formData.append("dosageForm", data.dosageForm || "");
    formData.append("manufacturer", data.manufacturer || "");

    formData.append("description", data.description || "");

    formData.append("categoryId", data.categoryId);

    formData.append("prescriptionReq", String(data.prescriptionReq));
    formData.append("status", String(data.status));

    formData.append("expiryDate", data.expiryDate || "");

    const file = data.images?.[0];
    if (file) {
      formData.append("images", file);
    }
    try {
      if (pdData?.id) {
        await api.put(`/products/${pdData?.id}`, formData);
        toast.success("Category Updated successfully!");
        onSuccess?.();
        setOpen(false);
      } else {
        await api.post("/products", formData);
        toast.success("Category created successfully!");
        onSuccess?.();
        setOpen(false);
      }

      reset();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl bg-white rounded-xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          {pdData?.id ? "Edit" : "Add"} Product
        </DialogTitle>
      </DialogHeader>

      {/* FORM START */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white"
      >
        {/* SKU */}
        <div className="space-y-1">
          <Label className="text-sm font-medium">SKU</Label>
          <Input
            {...register("sku", { required: "Sku is required" })}
            placeholder="MED-001"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Product Name */}
        <div className="space-y-1">
          <Label className="text-sm font-medium">Product Name</Label>
          <Input
            {...register("name", { required: "Product Name is required" })}
            placeholder="Sibelium 10mg Tablet"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Generic Name */}
        <div className="space-y-1">
          <Label>Generic Name</Label>
          <Input
            {...register("genericName")}
            placeholder="Flunarizine"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <Label>Pack Size</Label>
          <Input
            {...register("packSize")}
            placeholder="Sibelium"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", { required: "Price is required" })}
            placeholder="150"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Sale Price */}
        <div className="space-y-1">
          <Label>Sale Price</Label>
          <Input
            type="number"
            {...register("salePrice")}
            placeholder="120"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <Label>Stock</Label>
          <Input
            type="number"
            {...register("stock")}
            placeholder="50"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Strength */}
        <div className="space-y-1">
          <Label>Strength</Label>
          <Input
            {...register("strength")}
            placeholder="10 mg"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Dosage Form */}
        <div className="space-y-1">
          <Label>Dosage Form</Label>
          <select
            {...register("dosageForm")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
          </select>
        </div>

        {/* Manufacturer */}
        <div className="space-y-1">
          <Label>Manufacturer</Label>
          <Input
            {...register("manufacturer")}
            placeholder="Square / Incepta"
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label>Category</Label>
          <select
            {...register("categoryId")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Expiry Date */}
        <div className="space-y-1">
          <Label>Expiry Date</Label>
          <Input
            type="date"
            {...register("expiryDate")}
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-1">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            rows={4}
            placeholder="Write product details..."
            className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2 space-y-1">
          <Label>Product Image</Label>
          <Input
            type="file"
            {...register("images")}
            className="w-full border-gray-300"
          />
        </div>

        {/* Checkbox Row */}
        <div className="md:col-span-2 flex gap-6 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("prescriptionReq")} />
            Prescription Required
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("status")} defaultChecked />
            Active Product
          </label>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3 pt-3">
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
          </DialogClose>

          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {pdData?.id ? "Update" : "Save"} Product
          </button>
        </div>
      </form>
    </DialogContent>
  );
}
