
import ProductDetails from ".";
import { prisma } from "@/lib/prisma";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: {
        not: product.id,
      },
    },
    take: 4,
  });

  

  return <ProductDetails productData={product} relatedProducts={relatedProducts} />;
}
