"use client";

import { useForm } from "react-hook-form";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/CategoryForm";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useEffect } from "react";

export default function CategoryFrom({
  setOpen,
  catData,
}: {
  setOpen: (v: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    if (catData) {
      setValue("name", catData.name);
      setValue("slug", catData.slug);
      setValue("status", catData.status);
    } else {
      reset();
    }
  }, [catData]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("status", data.status);

    const file = data.images?.[0];

    // 👇 only send image if exists
    if (file) {
      formData.append("image", file);
    }

    try {
      if (data?.id) {
        await api.put(`/categories/${data?.id}`, formData);
        toast.success("Category Updated successfully!");
      } else {
        await api.post("/categories", formData);
        toast.success("Category created successfully!");
        setOpen(false);
      }

      reset();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-xl bg-white rounded-xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          { catData ? "Edit" : "Add"} Category
        </DialogTitle>
      </DialogHeader>

      {/* FORM START */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            {...register("name", { required: "Name is required" })}
            name="name"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="name"
            onChange={(e) => {
              const name = e.target.value;
              setValue("slug", generateSlug(name));
            }}
          />
        </div>

        {/* slug */}
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            {...register("slug", { required: "Name is required" })}
            name="slug"
            disabled
            readOnly
            type="text"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="slug"
          />
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Image</Label>
          <Input
            {...register("images", { required: "Images is required" })}
            accept="image/*"
            type="file"
            name="images"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="url1, url2, url3"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>

          <select
            {...register("status", { required: "Status is required" })}
            id="status"
            name="status"
            className="w-full py-1.5 rounded-md border border-gray-300 px-3 text-sm hover:border-gray-400 focus:outline-none focus:border-[#2dc67b] focus:ring-1 focus:ring-[#2dc67b]"
            defaultValue=""
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_stock">Out Of Stock</option>
            <option value="draft">Draft</option>
          </select>
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
            { catData ? "Updated" : "Save Category"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
