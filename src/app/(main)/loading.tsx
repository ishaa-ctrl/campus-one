export default function MainLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200/80 rounded-xl w-64 mb-2"></div>
      <div className="h-4 bg-gray-200/60 rounded-lg w-48 mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
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
  );
}
