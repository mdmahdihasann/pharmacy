import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    const existingCart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingCart) {
      await prisma.cart.update({
        where: {
          id: existingCart.id,
        },

        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity: 1,
        },
      });
    }

    return Response.json({ success: true, message: "Cart Add Successfully" });
  } catch (error: any) {
    console.log(error.message);
    return Response.json({ success: false, message: "Cart Not Added" });
  }
}
