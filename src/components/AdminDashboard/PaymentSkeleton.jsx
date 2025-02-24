import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PaymentSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 rounded mt-2 animate-pulse" />
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="h-4 w-4 bg-gray-200 rounded mr-1 animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded ml-2 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payments Table Skeleton */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow-sm rounded border border-gray-100">
            {/* Date Range Inputs Skeleton */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full">
              <div className="flex-1">
                <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>

            {/* Search Input Skeleton */}
            <div className="w-full md:w-auto relative mt-6">
              <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Export Button Skeleton */}
            <div className="w-full md:w-auto mt-6">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[...Array(7)].map((_, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                    {[...Array(7)].map((_, colIndex) => (
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 bg-white p-4 rounded-lg shadow">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSkeleton;