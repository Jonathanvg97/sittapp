export const ProductCardSkeleton = () => {
  return (
    <div className="ProductCardSkeleton grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4   gap-6 justify-center mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-lg shadow-md p-4 h-96 flex flex-col justify-between"
        >
          <div className="bg-gray-200 h-60 w-full rounded-t-lg" />
          <div className="mt-4 space-y-3">
            <div className="bg-gray-200 h-4 w-3/4 rounded" />
            <div className="bg-gray-200 h-3 w-1/2 rounded" />
            <div className="flex items-center justify-between">
              <div className="bg-gray-200 h-6 w-16 rounded" />
              <div className="bg-gray-200 h-8 w-20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
