"use client"

import { addCart, decreseCart, fetchCart, increseCart } from "@/store/slices/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function useCart (){
    const dispatch = useDispatch<AppDispatch>();

    const cartItems = useSelector((state: RootState)=>state.cart.items);
    const laoding = useSelector((state: RootState)=> state.cart.loading);

    return {
        cartItems,
        laoding,
        fetchCart: (userId: string) => dispatch(fetchCart(userId)),
        addCart: (data: {userId: string, productId: string}) => dispatch(addCart(data)),
        increseCart: (data: {userId: string, productId: string}) => dispatch(increseCart(data)),
        decreseCart: (data: {userId: string, productId: string}) => dispatch(decreseCart(data)),
    }
}