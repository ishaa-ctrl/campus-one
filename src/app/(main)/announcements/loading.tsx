export default function AnnouncementsLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse space-y-6">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <div className="h-8 bg-gray-200/80 rounded-xl w-52"></div>
        <div className="h-4 bg-gray-200/60 rounded-lg w-64"></div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200/60 rounded-full w-20"></div>
        ))}
      </div>

      {/* Announcement Card skeletons */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-5 flex gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-200/80 shrink-0"></div>
            <div className="flex-1 space-y-2.5">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200/80 rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-200/60 rounded-md w-16"></div>
              </div>
              <div className="h-3 bg-gray-200/60 rounded-md w-full"></div>
              <div className="h-3 bg-gray-200/60 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200/50 rounded-md w-32 pt-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
