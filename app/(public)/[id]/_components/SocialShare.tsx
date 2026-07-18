// components/ProductDetails/SocialShare.jsx
import React from 'react';
import { Button } from '@/components/ui/button';

const SocialShare = ({ socialIcons }: any) => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      {socialIcons.map(({ icon: Icon, label }: any) => (
        <Button
          key={label}
          variant="outline"
          size="icon"
          className="w-9 h-9 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
};

export default SocialShare;