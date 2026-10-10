export default function ProfileLoading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse space-y-6">
      {/* Profile Card Header Skeleton */}
      <div className="card p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200/80 shrink-0"></div>
          <div className="flex-1 space-y-3 w-full">
            <div className="h-6 bg-gray-200/80 rounded-md w-48"></div>
            <div className="h-4 bg-gray-200/60 rounded-md w-36"></div>
            <div className="h-3 bg-gray-200/50 rounded-md w-3/4"></div>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="h-4 bg-gray-200/60 rounded-md w-28"></div>
              <div className="h-4 bg-gray-200/60 rounded-md w-32"></div>
              <div className="h-4 bg-gray-200/60 rounded-md w-24"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-campus-border">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="h-6 bg-gray-200/80 rounded-md w-12 mx-auto"></div>
              <div className="h-3 bg-gray-200/50 rounded-md w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200/70 rounded-xl w-32"></div>
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-4 space-y-3">
            <div className="h-36 bg-gray-200/80 rounded-card-sm w-full"></div>
            <div className="h-4 bg-gray-200/80 rounded-md w-3/4"></div>
            <div className="h-3 bg-gray-200/60 rounded-md w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
