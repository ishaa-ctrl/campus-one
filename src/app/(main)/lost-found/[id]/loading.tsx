export default function LostFoundDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse space-y-6">
      <div className="h-4 bg-gray-200/80 rounded-md w-36 mb-6"></div>
      <div className="card p-6 lg:p-8 space-y-6">
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200/80 rounded-md w-20"></div>
        </div>
        <div className="h-8 bg-gray-200/80 rounded-xl w-2/3"></div>
        <div className="h-64 bg-gray-200/70 rounded-xl w-full"></div>
        <div className="h-16 bg-gray-200/60 rounded-xl w-full"></div>
      </div>
    </div>
  );
}
