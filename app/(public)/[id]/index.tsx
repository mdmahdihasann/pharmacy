// components/ProductDetails/index.jsx (Main entry point)
import React from 'react';
import MainProductDetails from './_components/MainProductDetails';
import ProductTabs from './_components/ProductTabs';
import RelatedProducts from './_components/RelatedProducts';
import { Button } from '@/components/ui/button';

const ProductDetails = ({ productData }: any) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
        <span className="text-gray-300">/</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Shop</a>
        <span className="text-gray-300">/</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Herbs</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{productData.name}</span>
      </nav>

      {/* Main Product */}
      <MainProductDetails data={productData} />

      {/* Tabs Section */}
      <ProductTabs 
        description={productData.description}
        additionalInfo={productData.additionalInfo}
        reviews={productData.reviews}
      />

      {/* Related Products */}
      <RelatedProducts products={productData.relatedProducts} />

      {/* Previous/Next Navigation */}
      <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-6 text-sm">
        <Button variant="ghost" className="text-gray-600 hover:text-blue-600">← Previous product</Button>
        <Button variant="ghost" className="text-gray-600 hover:text-blue-600">Next product →</Button>
      </div>
    </div>
  );
};

export default ProductDetails;