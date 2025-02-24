import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const RequestsSkeleton = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Statistics Cards Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Search and Filter Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardHeader>
      </Card>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {[...Array(6)].map((_, index) => (
                    <th key={index} className="px-4 py-3 text-left">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {[...Array(6)].map((_, colIndex) => (
                      <td key={colIndex} className="px-4 py-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsSkeleton;