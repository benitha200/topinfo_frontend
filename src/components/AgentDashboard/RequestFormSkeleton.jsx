import React from 'react';

const RequestFormSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Step 1: Basic Information Skeleton */}
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
          <form>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="mb-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
              <div className="mb-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="mb-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="mb-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestFormSkeleton;