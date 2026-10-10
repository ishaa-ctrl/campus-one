export default function NoteDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse space-y-6">
      <div className="h-4 bg-gray-200/80 rounded-md w-28 mb-6"></div>
      <div className="card p-6 lg:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="h-5 bg-gray-200/80 rounded-full w-16"></div>
            <div className="h-5 bg-gray-200/80 rounded-full w-12"></div>
          </div>
          <div className="h-8 bg-gray-200/80 rounded-xl w-3/4"></div>
          <div className="h-4 bg-gray-200/60 rounded-lg w-1/2"></div>
        </div>

        <div className="h-48 bg-gray-200/70 rounded-card-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-300/80 rounded-xl mb-3"></div>
          <div className="h-4 bg-gray-300/60 rounded-md w-32"></div>
        </div>

        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-gray-200/80 rounded-xl w-28"></div>
          <div className="h-10 bg-gray-200/70 rounded-xl w-24"></div>
          <div className="h-10 bg-gray-200/70 rounded-xl w-24"></div>
        </div>
      </div>
    </div>
  );
}
