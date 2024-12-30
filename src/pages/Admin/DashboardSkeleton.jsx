import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import AdminLayout from '../Admin/AdminLayout';

const DashboardSkeleton = () => {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Top Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                {index === 0 && <Users className="h-4 w-4 text-gray-200" />}
                {index === 1 && <Users className="h-4 w-4 text-gray-200" />}
                {index === 2 && <TrendingUp className="h-4 w-4 text-gray-200" />}
                {index === 3 && <BarChart2 className="h-4 w-4 text-gray-200" />}
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-1" />
                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>

          {/* Agent Distribution Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>

          {/* District Distribution Skeleton */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardSkeleton;