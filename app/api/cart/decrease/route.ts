import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request){
    const {userId, productId} = await req.json();
    try {
        const updateCart = await prisma.cart.update({
            where: {
                userId_productId:{
                    userId,
                    productId,
                },
            },
            data:{
                quantity:{
                    decrement: 1
                },
            },
        })
        return NextResponse.json({
            success: true,
            data: updateCart,
            message: "Data decrement successfully"
        })
    } catch (error:any) {
        console.log(error.message);
         return NextResponse.json({
            success: false,
            message: "Data decrement successfully"
        })
    }
}