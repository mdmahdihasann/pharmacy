"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

export default function CartPopup() {
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 120,
      qty: 2,
      image: "/medicine.jpg",
    },
    {
      id: 2,
      name: "Napa Extra",
      price: 80,
      qty: 1,
      image: "/medicine.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  return (
    <DrawerContent className="h-screen max-w-md ml-auto rounded-none bg-white flex flex-col">
      {/* Header */}
      <DrawerHeader className="border-b">
        <DrawerTitle className="flex items-center justify-between">
          <span>Shopping Cart</span>
          <span className="text-sm font-normal text-gray-500">
            {cartItems.length} Items
          </span>
        </DrawerTitle>
      </DrawerHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-20 h-20 relative overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-sm">{item.name}</h4>

                  <button className="text-red-500 hover:text-red-600">✕</button>
                </div>

                <p className="text-xs text-gray-500 mt-1">Medicine</p>

                <p className="font-bold text-green-600 mt-2">৳{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-3">
                  <button className="w-8 h-8 border rounded-lg hover:bg-gray-100">
                    -
                  </button>

                  <span className="font-medium w-8 text-center">
                    {item.qty}
                  </span>

                  <button className="w-8 h-8 border rounded-lg hover:bg-gray-100">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Item Total */}
            <div className="mt-3 pt-3 border-t flex justify-between text-sm">
              <span className="text-gray-500">Item Total</span>

              <span className="font-semibold">৳{item.price * item.qty}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t bg-white p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>৳60</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>৳{subtotal + 60}</span>
          </div>
        </div>

        <Button className="w-full h-11 bg-[#2dc67b] hover:bg-[#25aa69] text-white">
          Proceed To Checkout
        </Button>

        <DrawerClose asChild>
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  );
}
