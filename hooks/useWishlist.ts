"use client"
import { addWishlist, deleteWishlist, fetchWishlist } from '@/store/slices/wishlistSlice';
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

const useWishlist = () => {
    const dispatch = useDispatch<AppDispatch>();

    const wishItems = useSelector((state: RootState)=> state.wishlist.items);
    const loading = useSelector((state: RootState)=> state.wishlist.loading);

    return {
        wishItems,
        loading,
        fetchWishlist: (userId: String) => dispatch(fetchWishlist(userId)),
        addWishlist: (data:{userId: string; productId: string })=> dispatch(addWishlist(data)),
        deleteWishlist: (data:{userId: string; productId: string })=> dispatch(deleteWishlist(data)),
    }
  
}

export default useWishlist