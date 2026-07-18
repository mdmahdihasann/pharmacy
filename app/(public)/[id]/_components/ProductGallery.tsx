// components/ProductDetails/ProductGallery.jsx
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ProductGallery = ({ images, salePrice }: any) => {
  return (
    <div className="relative">
      <Badge className="absolute top-4 left-4 z-10 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-1.5">
        Save ${salePrice.toFixed(2)}
      </Badge>
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <img
          src={images?.main || "https://placehold.co/600x600/e9edf2/1e293b?text=Product"}
          alt="Product"
          className="w-full rounded-xl object-cover"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {[1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src={`https://placehold.co/80x80/e9edf2/1e293b?text=Thumb`}
            alt={`Thumbnail ${i}`}
            className="w-16 h-16 rounded-lg border-2 border-gray-200 object-cover cursor-pointer hover:border-blue-500 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;