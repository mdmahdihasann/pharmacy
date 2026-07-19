// components/ProductDetails/ProductMeta.jsx
import React from 'react';

const ProductMeta = ({ sku, category, tag }: any) => {
  return (
    <div className="mt-5 pt-4 border-t border-gray-200 text-sm text-gray-500 space-y-1">
      <p>
        <span className="font-medium">SKU:</span> {sku}
      </p>
      <p>
        <span className="font-medium">Category:</span>{" "}
        <a href="#" className="text-blue-600 hover:underline">
          {category?.name}
        </a>
      </p>
      <p>
        <span className="font-medium">Tag:</span>{" "}
        <a href="#" className="text-blue-600 hover:underline">
          {tag}
        </a>
      </p>
    </div>
  );
};

export default ProductMeta;