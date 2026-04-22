import { TaskForm } from '@/presentation/components/TaskForm';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export const metadata = {
  title: 'TaskFlow - New Task',
  description: 'Create a new task in TaskFlow',
};

export default function NewTaskPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <a href="/tasks" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors">
          ← Back to tasks
        </a>
      </div>
      <TaskForm userId={DEMO_USER_ID} />
    </div>
  );
}