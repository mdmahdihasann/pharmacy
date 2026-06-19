"use client"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "./_components/ProductForm";

import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CommonTable } from "@/components/table/CommonTable";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import DeletePopover from "@/components/DeletePopover";



const page = () => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProduct = async() =>{
    try {
      const res = await api.get("/products");
      const formateData = await res.data.map((item: any, index: number)=>({
        ...item,
        sl: index + 1
      }))
      setData(formateData);

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[])

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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
      accessorKey: "images",
      header: "Image",
      cell: (row: any) => {
        const image = row.images;

        return (
          <img
            src={image}
            alt="product"
            className="w-16 h-16 rounded object-cover"
          />
        );
      },
    },

  // ✅ ACTIONS (IMPORTANT FIX)
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const product = row;

      const handleEdit = () => {
        console.log("Edit:", product);
      };

    
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="px-1.5 py-1 text-[15px] border border-blue-700 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md"
          >
            <TbEdit />
          </button>

          <DeletePopover id={product?.id} onSuccess={fetchProduct} apiUrl="products"/>
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
            Products
          </h1>
          <div>
            <DialogTrigger asChild>
              <Button
                className="text-[14px] font-medium text-gray-200 hover:text-gray-600 dark:hover:text-gray-200 border border-gray-200
             dark:border-gray-700 rounded-lg px-3 py-2 transition-colors"
              >
                <FaPlus /> Add New
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <CommonTable columns={columns} data={data} />
      </div>

      <ProductForm onSuccess={fetchProduct} setOpen={setOpen}/>
    </Dialog>
  );
};

export default page;
