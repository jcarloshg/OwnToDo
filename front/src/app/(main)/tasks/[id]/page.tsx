import { CustomLink } from '@/presentation/components';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <CustomLink href="/tasks" variant="link" size="md" className="font-medium flex items-center gap-2">
          ← Back to tasks
        </CustomLink>
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