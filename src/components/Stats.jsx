import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const Stats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {stats.map((stat) => (
      <Card key={stat.title}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          {stat.icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stat.value}</div>
          <div className="flex items-center gap-1 text-sm">
            <span className={stat.trend > 0 ? 'text-green-600' : 'text-red-600'}>
              {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);