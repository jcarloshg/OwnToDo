export default function Loading() {
  return (
    <div className="card text-center py-16">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6" />
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );
}