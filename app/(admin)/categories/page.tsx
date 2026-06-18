"use client";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { TbEdit } from "react-icons/tb";
import { CommonTable } from "@/components/table/CommonTable";
import CategoryFrom from "./_components/CategoryFrom";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DeletePopover from "@/components/DeletePopover";

const page = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectData, setSelectData] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // column
  const columns = [
    {
      accessorKey: "sl",
      header: "SL",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (row: any) => {
        const status = row.status;

        return (
          <span
            className={`px-2 py-1 text-xs rounded ${
              status === "1"
                ? "font-semibold border border-green-600 text-green-600 rounded-md text-sm"
                : "font-semibold border border-yellow-600 text-yellow-600 rounded-md text-sm"
            }`}
          >
            {status === "1" ? "Publish" : "Pending"}
          </span>
        );
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: (row: any) => {
        const image = row.image;

        return (
          <img
            src={image}
            alt="category"
            className="w-16 h-16 rounded object-cover"
          />
        );
      },
    },

    // ✅ ACTIONS (IMPORTANT FIX)
    {
      id: "actions",
      header: "Actions",
      cell: (row: any) => {
        const product = row;

        const handleEdit = (product: any) => {
          setOpen(true);
          setSelectData(product);
        };

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(product)}
              className="px-1.5 py-1 text-[15px] border border-blue-700 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md"
            >
              <TbEdit />
            </button>

            <DeletePopover id={product.id} onSuccess={fetchCategories}/>
          </div>
        );
      },
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-3 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-tight text-gray-100">
            Category
          </h1>
          <div>
            <DialogTrigger asChild>
              <Button
                className="text-[14px] font-medium text-gray-200 hover:text-gray-600 dark:hover:text-gray-200 border border-gray-200
             dark:border-gray-700 rounded-lg px-3 py-2 transition-colors"
             onClick={()=>setSelectData(null)}
              >
                <FaPlus /> Add New
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <CommonTable columns={columns} data={data} />
      </div>

      <CategoryFrom setOpen={setOpen} catData={selectData} onSuccess={fetchCategories}/>
    </Dialog>
  );
};

export default page;
