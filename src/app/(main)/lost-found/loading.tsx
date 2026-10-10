export default function LostFoundLoading() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200/80 rounded-xl w-48"></div>
          <div className="h-4 bg-gray-200/60 rounded-lg w-64"></div>
        </div>
        <div className="h-10 bg-gray-200/80 rounded-xl w-36"></div>
      </div>

      {/* Filter skeleton */}
      <div className="card p-4 space-y-4">
        <div className="h-11 bg-gray-200/70 rounded-xl w-full"></div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-7 bg-gray-200/60 rounded-full w-16"></div>
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="h-40 bg-gray-200/80 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200/80 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200/60 rounded-md w-1/2"></div>
              <div className="h-3 bg-gray-200/60 rounded-md w-1/3"></div>
              <div className="pt-3 border-t border-campus-border flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200/80"></div>
                <div className="h-3 bg-gray-200/60 rounded-md w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
