import React from 'react'

function SkeletonLoader() {
    return (
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto"
            ></div>
          ))}
        </div>
      );
}

export default SkeletonLoader