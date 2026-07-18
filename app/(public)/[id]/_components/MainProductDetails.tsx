"use client"

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Scale,
  Mail,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Send,
  MessageCircle,
  Zap,
  Info,
  Star,
} from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import ProductGallery from './ProductGallery';
import ProductMeta from './ProductMeta';
import SocialShare from './SocialShare';

const socialIcons = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaLinkedinIn, label: "Twitter" },
  { icon: FaXTwitter, label: "LinkedIn" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Send, label: "Telegram" },
];

const renderStars = (rating: number) => {
  return Array(5).fill(0).map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
    />
  ));
};

const MainProductDetails = ({ data }: any) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl pt-4">
      {/* Left - Gallery */}
      <ProductGallery images={data?.images} salePrice={data?.originalPrice - data?.price} />

      {/* Right - Summary */}
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{data?.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-0.5">{renderStars(data?.rating)}</div>
          <span className="text-sm text-gray-500">({data?.reviewCount} review)</span>
        </div>

        {/* Short Description */}
        <ul className="mt-4 space-y-1.5">
          {data?.shortDesc.map((item: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-600" />
              {item}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-3xl font-bold text-red-600">${data?.price.toFixed(2)}</span>
          {data?.originalPrice && (
            <span className="text-lg text-gray-400 line-through">${data?.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10 w-10 hover:bg-gray-100"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-0 focus:ring-0 text-sm py-2 h-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10 w-10 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-full transition-all">
            <Zap className="w-4 h-4 mr-2" />
            Buy now
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
          <Button variant="ghost" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600">
            <Heart className="w-5 h-5" />
            Add to wishlist
          </Button>
          <Button variant="ghost" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600">
            <Scale className="w-5 h-5" />
            Add to compare
          </Button>
          <Button variant="ghost" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600">
            <Mail className="w-5 h-5" />
            Ask about product
          </Button>
        </div>

        {/* Promo Banner */}
        <Card className="mt-5 bg-blue-50 border-blue-100">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              Add 15 products to cart and get $10 discount
            </span>
          </CardContent>
        </Card>

        {/* Meta */}
        <ProductMeta sku={data?.sku} category={data?.category} tag={data?.tag} />

        {/* Social Share */}
        <SocialShare socialIcons={socialIcons} />
      </div>
    </div>
  );
};

export default MainProductDetails;