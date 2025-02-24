import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const RequestDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Client Information Skeleton */}
            <div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Request Details Skeleton */}
            <div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>

            {/* Payment Information Skeleton */}
            <div className="md:col-span-2">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="bg-gray-50 p-4 rounded-md">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestDetailsSkeleton;