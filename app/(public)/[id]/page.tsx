
import ProductDetails from ".";

const sampleData = {
  name: "Elastoplast Sensitive XXL Dressings",
  price: 7.11,
  originalPrice: 8.5,
  rating: 5,
  reviewCount: 1,
  sku: "10009111",
  category: "Herbs",
  tag: "Tablets",
  images: { main: "https://placehold.co/600x600/e9edf2/1e293b?text=Product" },
  shortDesc: ["3 cleaning programs", "Digital display", "Memory for 1 user"],
  description: `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born...`,
  additionalInfo: {
    Brand: "Allisa",
    Form: "Oral Tablets",
    Frequency: "3 times daily",
    Strength: "15 MG",
  },
  reviews: [
    {
      id: 1,
      author: "John Smith",
      date: "March 9, 2022",
      rating: 5,
      comment: "Pretty with plenty of pages, but not enough space for notes.",
      avatar: "https://placehold.co/56x56/e9edf2/1e293b?text=AV",
    },
  ],
  relatedProducts: [
    {
      id: 2,
      name: "Chemists' Own Antihistamine",
      price: 7.95,
      image: "https://placehold.co/300x300/e9edf2/1e293b?text=Product1",
    },
    {
      id: 3,
      name: "Montelukast",
      price: 97.2,
      image: "https://placehold.co/300x300/e9edf2/1e293b?text=Product2",
    },
    {
      id: 4,
      name: "Henry Blooms Collagen Gel",
      price: 39.0,
      originalPrice: 44.0,
      image: "https://placehold.co/300x300/e9edf2/1e293b?text=Product3",
    },
    {
      id: 5,
      name: "ApoHealth Cold & Flu Relief",
      price: 3.14,
      originalPrice: 5.95,
      image: "https://placehold.co/300x300/e9edf2/1e293b?text=Product4",
    },
  ],
};

export default async function ProductPage({ params }: any) {
  const { id } = await params;

  const res = await fetch(`/api/products/${id}`);

  console.log(res);

  return <ProductDetails productData={sampleData} />;
}
