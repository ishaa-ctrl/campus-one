export default function MarketplaceDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse space-y-6">
      <div className="h-4 bg-gray-200/80 rounded-md w-36 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card p-6 lg:p-8">
        <div className="h-72 bg-gray-200/80 rounded-xl w-full"></div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200/80 rounded-md w-24"></div>
          <div className="h-8 bg-gray-200/80 rounded-xl w-3/4"></div>
          <div className="h-8 bg-gray-200/80 rounded-md w-28"></div>
          <div className="h-20 bg-gray-200/60 rounded-xl w-full"></div>
          <div className="flex gap-3 pt-4">
            <div className="h-10 bg-gray-200/80 rounded-xl w-36"></div>
            <div className="h-10 bg-gray-200/70 rounded-xl w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
