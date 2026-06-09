"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CategoryFrom() {
  return (
    <DialogContent className="sm:max-w-xl bg-white rounded-xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Add Category
        </DialogTitle>
      </DialogHeader>

      {/* FORM START */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="name"
          />
        </div>

        {/* slug */}
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            name="slug"
            type="text"
            className="border border-gray-300 hover:border-gray-400 transition focus:border-[#2dc67b] focus:ring-[#2dc67b] focus-visible:ring-1"
            placeholder="slug"
          />
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Image</Label>
          <Input
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
            Save Category
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
