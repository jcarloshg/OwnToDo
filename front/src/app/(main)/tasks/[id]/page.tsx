interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <a href="/tasks" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors">
          ← Back to tasks
        </a>
      </div>
      <div className="card">
        <h2 className="text-3xl font-extrabold text-primary mb-6">Task Details</h2>
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <p className="text-gray-500 text-lg">Task detail view - to be implemented</p>
          <p className="text-gray-400 mt-2">ID: {id}</p>
        </div>
      </div>
    </div>
  );
}