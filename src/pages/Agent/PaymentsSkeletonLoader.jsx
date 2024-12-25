import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { DollarSign, CreditCard, Users } from 'lucide-react';
import AgentLayout from './AgentLayout';

const PaymentsSkeletonLoader = () => {
  return (
    <AgentLayout>
      <div className="p-2 md:p-6 space-y-4 md:space-y-6">
        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-emerald-900">Total Payments</CardTitle>
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-emerald-200/50 rounded animate-pulse" />
            </CardContent>
          </Card>

          <Card className="bg-sky-50 border-sky-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-sky-900">Total Commission</CardTitle>
              <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-sky-200/50 rounded animate-pulse" />
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200 sm:col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-yellow-900">Completed Payments</CardTitle>
              <Users className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-yellow-200/50 rounded animate-pulse" />
            </CardContent>
          </Card>
        </div>

        {/* Table Skeleton */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-lg md:text-xl">Payment Details</CardTitle>
            <div className="w-full sm:w-64 h-10 bg-gray-200 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="whitespace-nowrap">Agent</TableHead>
                    <TableHead className="whitespace-nowrap">Client Name</TableHead>
                    <TableHead className="whitespace-nowrap">Service Category</TableHead>
                    <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Amount</TableHead>
                    <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(8)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="flex space-x-2">
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
};

export default PaymentsSkeletonLoader;