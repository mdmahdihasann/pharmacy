"use client";
// components/ProductDetails/ProductTabs.jsx
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, FileText, Info, MessageSquare } from "lucide-react";

const renderStars = (rating: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
};

const ProductTabs = ({ description, additionalInfo, reviews }: any) => {
  const [rating, setRating] = useState(0);

  return (
    <>
    <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
      <Tabs defaultValue="description" className="w-full flex flex-col">
        <TabsList className="flex flex-wrap gap-6 bg-transparent border-b w-full border-gray-200 pb-0 h-auto">
          <TabsTrigger
            value="description"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-gray-900 text-gray-500 pb-2 rounded-none bg-transparent hover:text-gray-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-gray-900 text-gray-500 pb-2 rounded-none bg-transparent hover:text-gray-700"
          >
            <Info className="w-4 h-4 mr-2" />
            Additional information
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-gray-900 text-gray-500 pb-2 rounded-none bg-transparent hover:text-gray-700"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Reviews ({reviews?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="mt-5 space-y-4 text-gray-700 leading-relaxed"
        >
          <h2 className="text-xl font-semibold text-gray-900">Description</h2>
          <p>{description}</p>
          
        </TabsContent>

        <TabsContent value="additional" className="mt-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Additional information
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {/* {Object.entries(additionalInfo).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-2.5 font-medium text-gray-700 w-1/3">
                      {key}
                    </td>
                    <td className="py-2.5 text-gray-600">{value}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {reviews?.length} review for this product
          </h2>

          {/* Review List */}
          <div className="space-y-6">
            {/* {reviews.map((review: any) => (
              <div
                key={review?.id}
                className="flex gap-4 pb-6 border-b border-gray-100"
              >
                <img
                  src={
                    review?.avatar ||
                    "https://placehold.co/56x56/e9edf2/1e293b?text=AV"
                  }
                  alt={review?.author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center gap-0.5">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review?.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      – {review?.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))} */}
          </div>

          {/* Review Form */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add a review
              </h3>
              <form className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Your rating *
                  </Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="p-0 hover:bg-transparent"
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Your review *
                  </Label>
                  <Textarea
                    rows={4}
                    className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      Name *
                    </Label>
                    <Input className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="save-info"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="save-info" className="text-sm text-gray-600">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-full"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      
    </div>

    </>
  );
};

export default ProductTabs;
