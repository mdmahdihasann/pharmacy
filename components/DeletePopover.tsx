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

export default function DeletePopover({ id, onSuccess }: any) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/categories/${id}`);

      toast.success("Deleted successfully");

      onSuccess?.(); // parent refresh data
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-52">
        <p className="text-sm mb-3">
          Are you sure you want to delete?
        </p>

        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline">
            Cancel
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes Delete"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}