export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
}