"use client";

import useUser from "@/hooks/useUser";
import useWishlist from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { toast } from "sonner";

const WishlistBtn = ({ product }: any) => {
  const router = useRouter();
  const user = useUser();
  const { wishItems, fetchWishlist, addWishlist, deleteWishlist } =
    useWishlist();

  const isWishlisted = wishItems?.some(
    (item: any) => item.productId === product.id,
  );

  useEffect(() => {
    if (user?.id) {
      fetchWishlist(user.id);
    }
  }, [user]);

  const handleAdd = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await addWishlist({
        userId: user.id,
        productId: product.id,
      });
      fetchWishlist(user.id);
      toast.success("Wishlist added");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWishlist({
        userId: user.id,
        productId: product.id,
      });
      fetchWishlist(user.id);
      toast.success("Wishlist removed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500"
      aria-label="Wishlist"
    >
      {isWishlisted ? (
        <GoHeartFill
          onClick={handleDelete}
          className="text-red-500 cursor-pointer"
        />
      ) : (
        <FiHeart onClick={handleAdd} className="cursor-pointer" />
      )}
    </div>
  );
};

export default WishlistBtn;
