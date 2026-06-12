"use client"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "./_components/ProductForm";

import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CommonTable } from "@/components/table/CommonTable";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      
      const status = row?.status;

      return (
        <span
          className={`px-2 py-1 text-xs rounded ${
            status === "Success"
              ? "font-semibold border border-green-600 text-green-600 rounded-md text-sm"
              : "font-semibold border border-yellow-600 text-yellow-600 rounded-md text-sm"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
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

      const handleDelete = () => {
        console.log("Delete:", product.id);
      };

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="px-1.5 py-1 text-[15px] border border-blue-700 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md"
          >
            <TbEdit />
          </button>

          <button
            onClick={handleDelete}
            className="px-1.5 py-1 text-[15px] border border-red-700 text-red-600 hover:bg-red-700 hover:text-white rounded-md"
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      );
    },
  },
];

const data = [
  {
    id: 1,
    name: "Paracetamol",
    price: 10,
    sku: "SKU-001",
    category: "Medicine",
    stock: 100,
    status: "Success",
    image: "",
  },
  {
    id: 2,
    name: "Paracetamol",
    price: 10,
    sku: "SKU-001",
    category: "Medicine",
    stock: 100,
    status: "Pending",
    image: "",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 10,
    sku: "SKU-001",
    category: "Medicine",
    stock: 100,
    status: "Pending",
    image: "",
  },
];
const page = () => {
  return (
    <Dialog>
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

      <ProductForm />
    </Dialog>
  );
};

export default page;
