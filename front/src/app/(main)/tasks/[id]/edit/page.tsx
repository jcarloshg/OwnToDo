import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href={`/tasks/${id}`} className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors">
          ← Back to task
        </Link>
      </div>
      <div className="card">
        <h2 className="text-3xl font-extrabold text-primary mb-6">Edit Task</h2>
        <div className="bg-accent/5 rounded-2xl p-8 text-center">
          <p className="text-gray-500 text-lg">Edit form - to be implemented</p>
          <p className="text-gray-400 mt-2">ID: {id}</p>
        </div>
      </div>
    </div>
  );
}