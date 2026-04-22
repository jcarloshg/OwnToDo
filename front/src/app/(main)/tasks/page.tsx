import Link from 'next/link';
import { getTasks } from '@/infrastructure/api/taskApi';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export default async function TasksPage() {
  let tasks: Awaited<ReturnType<typeof getTasks>> = [];
  try {
    tasks = await getTasks(DEMO_USER_ID);
  } catch {
    tasks = [];
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800">Your Tasks</h2>
        <Link
          href="/tasks/new"
          className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary/30"
        >
          + New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <p className="text-gray-500 text-lg mb-6">No tasks yet</p>
          <Link href="/tasks/new" className="btn-accent inline-flex px-8 py-3">
            Create your first task
          </Link>
        </div>
      ) : (
        <ul className="space-y-5">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link
                href={`/tasks/${task.id}`}
                className="card block hover-lift"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{task.description}</p>
                    )}
                  </div>
                  <span
                    className={`status-badge ${
                      task.status === 'completed'
                        ? 'status-completed'
                        : 'status-pending'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="mt-5 flex gap-6 text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <span className="font-semibold text-primary">{task.effortPoints}</span> effort
                  </span>
                  {task.dueDate && (
                    <span className="flex items-center gap-2 text-gray-500">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}