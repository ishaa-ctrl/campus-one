export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Greeting Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200/80 rounded-xl w-72"></div>
        <div className="h-4 bg-gray-200/60 rounded-lg w-52"></div>
      </div>

      {/* Quick Access Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 h-36 bg-gray-200/70 rounded-card flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-300/80"></div>
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-gray-300/80 rounded-md w-24"></div>
                <div className="h-3 bg-gray-300/60 rounded-md w-36"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-300/60 rounded-md w-20"></div>
          </div>
        ))}
      </div>

      {/* Latest Notes Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200/80 rounded-lg w-36"></div>
          <div className="h-4 bg-gray-200/60 rounded-lg w-20"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-4 space-y-3">
              <div className="h-36 bg-gray-200/80 rounded-card-sm w-full"></div>
              <div className="h-4 bg-gray-200/80 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200/60 rounded-md w-1/2"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-gray-200/80 rounded-md w-14"></div>
                <div className="h-4 bg-gray-200/60 rounded-md w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200/80 rounded-lg w-48"></div>
          <div className="h-4 bg-gray-200/60 rounded-lg w-20"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="h-44 bg-gray-200/80 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200/80 rounded-md w-2/3"></div>
                  <div className="h-4 bg-gray-200/80 rounded-md w-12"></div>
                </div>
                <div className="h-3 bg-gray-200/60 rounded-md w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
