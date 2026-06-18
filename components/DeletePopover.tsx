"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import api from "@/lib/axios";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function DeletePopover({ id, onSuccess}: any) {
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/categories/${id}`, { method: "DELETE" });
      setOpenPopup(false);
      toast.success("Deleted successfully");
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={openPopup} onOpenChange={setOpenPopup}>
      <PopoverTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="px-1.5 py-1 text-[15px] border border-red-700 text-red-600 hover:bg-red-700 hover:text-white rounded-md"
        >
          <RiDeleteBin5Line />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 bg-white">
        <p className="text-sm mb-3 text-center">
          Are you sure you want to delete?
        </p>

        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            className="border border-gray-500"
            onClick={() => setOpenPopup(false)}
          >
            Cancel
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="border border-red-700 text-red-600 hover:bg-red-700 hover:text-white rounded-md"
          >
            {loading ? "Deleting..." : "Yes Delete"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
