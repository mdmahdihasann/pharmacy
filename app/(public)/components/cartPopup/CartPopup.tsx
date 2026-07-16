"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import useCart from "@/hooks/useCart";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";

export default function CartPopup() {
  const { cartItems, fetchCart, increseCart, decreseCart, deleteCart } = useCart();
  const user = useUser();

  const increments = async (item: any) => {
    try {
      await increseCart({ userId: user?.id, productId: item?.product?.id });
      await fetchCart(user?.id);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const decrements = async (item: any) => {
    try {
      await decreseCart({ userId: user?.id, productId: item?.product?.id });
      await fetchCart(user?.id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteCart = async (item: any) =>{
    try {
      await deleteCart({userId:user?.id, productId: item?.product?.id})
      await fetchCart(user?.id);
      toast.success("Cart delete successfully")
    } catch (error:any) {
      console.log(error.message);
    }
  }

  const subtotal = cartItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <DrawerContent className="h-screen max-w-md ml-auto rounded-none border border-gray-200 bg-white flex flex-col">
      {/* Header */}
      <DrawerHeader className="border-b border-gray-200 mb-2">
        <DrawerTitle className="flex items-center font-bold text-gray-700 justify-between">
          <span>Shopping Cart</span>
          <span className="text-sm font-normal text-gray-500">
            {cartItems?.length} Items
          </span>
        </DrawerTitle>
      </DrawerHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="pb-5 bg-white transition flex items-center justify-between border-b border-gray-200 last:border-b-0"
          >
            <div className="flex gap-3 items-center">
              {/* Image */}
              <div className="w-20 h-20 relative overflow-hidden rounded-lg border border-gray-200  bg-gray-50">
                <Image
                  src={item.product.images}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-gray-700 text-sm">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Medicine</p>

                  <p className="font-bold text-green-600 mt-2">
                    ৳{item.product.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-6">
              {/* Remove */}
              <button
                className="text-red-500 hover:text-red-600 transition cursor-pointer"
                onClick={() => handleDeleteCart(item)}
              >
                ✕
              </button>

              {/* Quantity Controller */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button
                  className="w-9 h-9 flex items-center justify-center hover:bg-white transition"
                  onClick={() => decrements(item)}
                >
                  {item?.quantity === 1 ? (
                    <FiTrash2 size={13} className="text-red-400" />
                  ) : (
                    <FaMinus size={12} />
                  )}
                </button>

                <input
                  type="text"
                  min="1"
                  max="999"
                  value={item.quantity}
                  readOnly
                  className="w-10 text-center bg-transparent font-semibold outline-none"
                />

                <button
                  className="w-9 h-9 flex items-center justify-center hover:bg-white transition"
                  onClick={() => increments(item)}
                >
                  <FaPlus className="text-[12px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>৳60</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>৳{subtotal + 60}</span>
          </div>
        </div>

        <Button className="w-full h-11 bg-[#2dc67b] hover:bg-[#25aa69] text-white">
          Proceed To Checkout
        </Button>
      </div>
    </DrawerContent>
  );
}
